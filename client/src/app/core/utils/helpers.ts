import { ReactNode } from 'react'
import { BASE_URL } from "client/src/app/contains";

// AssetHelpers
export const toAbsoluteUrl = (pathname: string) =>
  BASE_URL + pathname;

export const useIllustrationsPath = (illustrationName: string): string => {
  // Note: useLayout will need to be updated once we move the layout components
  // Temporarily comment this out until we move the layout components
  /*
  const { config } = useLayout();

  const extension = illustrationName.substring(
    illustrationName.lastIndexOf("."),
    illustrationName.length
  );
  const illustration =
    ThemeModeComponent.getMode() === "dark"
      ? `${illustrationName.substring(
        0,
        illustrationName.lastIndexOf(".")
      )}-dark`
      : illustrationName.substring(0, illustrationName.lastIndexOf("."));
  return toAbsoluteUrl(
    `media/illustrations/${config.illustrations?.set}/${illustration}${extension}`
  );
  */
  return toAbsoluteUrl(`media/illustrations/${illustrationName}`);
};

// RouterHelpers
export function getCurrentUrl(pathname: string) {
  return pathname.split(/[?#]/)[0]
}

export function checkIsActive(pathname: string, url: string) {
  const current = getCurrentUrl(pathname)
  if (!current || !url) {
    return false
  }

  if (current === url) {
    return true
  }

  if (current.indexOf(url) > -1) {
    return true
  }

  return false
}

// React18MigrationHelpers
export type WithChildren = {
  children?: ReactNode
}

// CSS Utils
export function getCSSVariableValue(variableName: string): string {
  let hex = getComputedStyle(document.documentElement).getPropertyValue(variableName)
  if (hex && hex.length > 0) {
    hex = hex.trim()
  }
  return hex
} 