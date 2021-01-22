import codeSVG from "@plone/volto/icons/code.svg";
import { ImageCardsView, ImageCardsEdit } from "./ImageCards";

export default (config) => {
  config.blocks.blocksConfig.imagecards = {
    id: "imagecards",
    title: "Image Cards",
    icon: codeSVG,
    group: "custom_addons",
    view: ImageCardsView,
    edit: ImageCardsEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };
  return config;
};
