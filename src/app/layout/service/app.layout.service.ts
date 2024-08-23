import { Injectable, effect, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    theme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    private readonly THEME_KEY = 'app-theme';
    private readonly COLOR_SCHEME_KEY = 'app-color-scheme';
    private readonly SCALE = 'scale';
    private readonly MENU_MODE = 'menu-mode';

    _config: AppConfig = {
        ripple: true,
        inputStyle: 'filled',
        menuMode: this.getStoredMenuMode(),
        colorScheme: this.getStoredColorScheme(),
        theme: this.getStoredTheme(),
        scale: this.getStoredScale()
    };

    config = signal<AppConfig>(this._config);

    state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
    };

    private configUpdate = new Subject<AppConfig>();

    private overlayOpen = new Subject<any>();

    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();

    constructor() {
        this.initializeLayout();
        effect(() => {
            const config = this.config();
            if (this.updateStyle(config)) {
                this.changeTheme();
            }
            this.changeScale(config.scale);
            this.onConfigUpdate();
        });
    }

    private getStoredTheme(): string {
        return localStorage.getItem(this.THEME_KEY) || 'bootstrap4-light-blue';
    }

    private getStoredColorScheme(): string {
        return localStorage.getItem(this.COLOR_SCHEME_KEY) || 'light';
    }

    private getStoredScale(): number {
        return parseInt(localStorage.getItem(this.SCALE)) || 14;
    }

    private getStoredMenuMode(): string {
        return localStorage.getItem(this.MENU_MODE) || 'static';
    }

    private storeTheme(theme: string) {
        localStorage.setItem(this.THEME_KEY, theme);
    }

    private storeColorScheme(colorScheme: string) {
        localStorage.setItem(this.COLOR_SCHEME_KEY, colorScheme);
    }

    private storeScale(scale: number) {
        localStorage.setItem(this.SCALE, String(scale));
    }

    private storeMenuMode(menuMode: string) {
        localStorage.setItem(this.MENU_MODE, menuMode);
    }

    updateStyle(config: AppConfig) {
        return (
            config.theme !== this._config.theme ||
            config.colorScheme !== this._config.colorScheme
        );
    }

    initializeLayout() {
        const config = this.config();
        this.changeTheme();
        this.changeScale(config.scale);
        this.onConfigUpdate();
    }

    onMenuToggle() {
        if (this.isOverlay()) {
            this.state.overlayMenuActive = !this.state.overlayMenuActive;
            if (this.state.overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.state.staticMenuDesktopInactive =
                !this.state.staticMenuDesktopInactive;
        } else {
            this.state.staticMenuMobileActive =
                !this.state.staticMenuMobileActive;

            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);

            }
        }
    }

    showProfileSidebar() {
        this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
        if (this.state.profileSidebarVisible) {
            this.overlayOpen.next(null);
        }
    }

    showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    isOverlay() {
        return this.config().menuMode === 'overlay';
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return !this.isDesktop();
    }

    onConfigUpdate() {
        this._config = { ...this.config() };
        this.storeTheme(this._config.theme);
        this.storeColorScheme(this._config.colorScheme);
        this.storeScale(this._config.scale);
        this.storeMenuMode(this._config.menuMode);
        this.configUpdate.next(this.config());
    }

    changeTheme() {
        const config = this.config();
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const themeLinkHref = themeLink.getAttribute('href')!;
        const newHref = themeLinkHref
            .split('/')
            .map((el) =>
                el == this._config.theme
                    ? (el = config.theme)
                    : el == `theme-${this._config.colorScheme}`
                        ? (el = `theme-${config.colorScheme}`)
                        : el
            )
            .join('/');

        this.replaceThemeLink(newHref);
    }

    replaceThemeLink(href: string) {
        const id = 'theme-css';
        let themeLink = <HTMLLinkElement>document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(
            cloneLinkElement,
            themeLink.nextSibling
        );
        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
        });
    }

    changeScale(value: number) {
        this.storeScale(parseInt(`${value}`));
        document.documentElement.style.fontSize = `${value}px`;
    }
}
