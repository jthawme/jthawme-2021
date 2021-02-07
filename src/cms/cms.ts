import CMS from "netlify-cms-app";

import { UpdatesPreview } from "./preview-templates/UpdatesPreview";
import "../styles/globals.scss";

CMS.registerPreviewTemplate("updates", UpdatesPreview);
