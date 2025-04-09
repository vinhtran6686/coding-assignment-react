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
export interface WithChildren {
  children: ReactNode;
}

// CSS Utils
export function getCSSVariableValue(variableName: string): string {
  let hex = getComputedStyle(document.documentElement).getPropertyValue(variableName)
  if (hex && hex.length > 0) {
    hex = hex.trim()
  }
  return hex
}

/**
 * Format a number with commas
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Capitalize the first letter of a string
 */
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert a string to camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

/**
 * Create a debounced function that delays invoking func until after wait milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
} 