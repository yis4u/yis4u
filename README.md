# Tay’s portfolio

A responsive, dependency-free personal portfolio built with HTML, CSS, and JavaScript. Name: Tay. Tagline: “Be happy”. Contact: zhenyea@gmail.com. The only featured project is Portfolio Website.

## Run locally

From this directory, run `python3 -m http.server 8000`, then visit `http://localhost:8000`.

## GitHub Pages

The site is buildless and uses relative asset paths, compatible with https://yis4u.github.io/yis4u/. Publish the repository root from `main` in GitHub Pages settings. No package installation, generated output, external fonts, or runtime dependencies are required.

## Interactions and accessibility

- The project card opens a native modal dialog with focus containment, Escape, close button, backdrop dismissal, and focus restoration.
- The theme follows the operating system until explicitly selected. Selections persist in local storage when available; blocked storage does not prevent switching themes.
- Mobile navigation supports Enter/Space, Tab, Escape, and focus movement to the selected section. Without JavaScript, navigation remains visible.
- Copy email uses the Clipboard API and announces success or failure. It requires HTTPS or localhost and browser clipboard permission. The email link remains available as a fallback.
- Animations and smooth scrolling are disabled for reduced-motion preferences.

## Validation

Checked in headless Chromium at widths 320, 390, 760, 768, 1024, and 1440 pixels for horizontal overflow. Desktop/mobile screenshots were reviewed. Browser interaction checks cover modal keyboard behavior and dismissal, saved themes and blocked storage, clipboard success/failure, mobile navigation, reduced motion, JavaScript-disabled navigation/contact, and browser exceptions. Firefox, Safari, and assistive technology have not been manually tested.
