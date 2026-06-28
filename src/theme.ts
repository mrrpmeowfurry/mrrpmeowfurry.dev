// takes one seed colour and builds the whole material 3 palette from it
// (using the same material-color-utilities lib that android's material you
// uses), then writes all the --md-sys-color-* variables onto an element.
// so i only ever pick one colour and everything else follows from it.
import {
  Hct,
  SchemeTonalSpot,
  MaterialDynamicColors,
  argbFromHex,
  hexFromArgb,
  type DynamicColor,
  type DynamicScheme,
} from "@material/material-color-utilities";

const mdc = new MaterialDynamicColors();

// maps each variable name to the matching colour role from the lib
const ROLES: Record<string, () => DynamicColor> = {
  primary: () => mdc.primary(),
  "on-primary": () => mdc.onPrimary(),
  "primary-container": () => mdc.primaryContainer(),
  "on-primary-container": () => mdc.onPrimaryContainer(),
  secondary: () => mdc.secondary(),
  "on-secondary": () => mdc.onSecondary(),
  "secondary-container": () => mdc.secondaryContainer(),
  "on-secondary-container": () => mdc.onSecondaryContainer(),
  tertiary: () => mdc.tertiary(),
  "on-tertiary": () => mdc.onTertiary(),
  "tertiary-container": () => mdc.tertiaryContainer(),
  "on-tertiary-container": () => mdc.onTertiaryContainer(),
  error: () => mdc.error(),
  "on-error": () => mdc.onError(),
  "error-container": () => mdc.errorContainer(),
  "on-error-container": () => mdc.onErrorContainer(),
  background: () => mdc.background(),
  "on-background": () => mdc.onBackground(),
  surface: () => mdc.surface(),
  "on-surface": () => mdc.onSurface(),
  "surface-variant": () => mdc.surfaceVariant(),
  "on-surface-variant": () => mdc.onSurfaceVariant(),
  "surface-dim": () => mdc.surfaceDim(),
  "surface-bright": () => mdc.surfaceBright(),
  "surface-container-lowest": () => mdc.surfaceContainerLowest(),
  "surface-container-low": () => mdc.surfaceContainerLow(),
  "surface-container": () => mdc.surfaceContainer(),
  "surface-container-high": () => mdc.surfaceContainerHigh(),
  "surface-container-highest": () => mdc.surfaceContainerHighest(),
  outline: () => mdc.outline(),
  "outline-variant": () => mdc.outlineVariant(),
  "inverse-surface": () => mdc.inverseSurface(),
  "inverse-on-surface": () => mdc.inverseOnSurface(),
  "inverse-primary": () => mdc.inversePrimary(),
  shadow: () => mdc.shadow(),
  scrim: () => mdc.scrim(),
  "surface-tint": () => mdc.surfaceTint(),
};

/** the one colour everything is built from — a trans/enby pink-magenta */
export const SEED = "#C13E9C";

export function applyTheme(
  isDark: boolean,
  seed: string = SEED,
  target: HTMLElement = document.documentElement,
): void {
  const scheme: DynamicScheme = new SchemeTonalSpot(
    Hct.fromInt(argbFromHex(seed)),
    isDark,
    0,
  );
  for (const [name, role] of Object.entries(ROLES)) {
    target.style.setProperty(
      `--md-sys-color-${name}`,
      hexFromArgb(role().getArgb(scheme)),
    );
  }
  target.style.colorScheme = isDark ? "dark" : "light";
}
