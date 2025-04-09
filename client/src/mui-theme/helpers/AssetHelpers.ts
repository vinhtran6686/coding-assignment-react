import { useLayout } from "../layout/core";
import { ThemeModeComponent } from "../assets/ts/layout";
import { BASE_URL } from "client/src/app/contains";

export const toAbsoluteUrl = (pathname: string) =>
  BASE_URL + pathname;

export const useIllustrationsPath = (illustrationName: string): string => {
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
};
