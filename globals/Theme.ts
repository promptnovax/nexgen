import { GlobalConfig } from "payload";

export const Theme: GlobalConfig = {
    slug: "theme",
    label: "Theme Settings",
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "selection",
            type: "select",
            defaultValue: "default",
            options: [
                { label: "Default (Dark)", value: "default" },
                { label: "Ocean Blue", value: "ocean" },
                { label: "Forest Green", value: "forest" },
                { label: "Sunset Glow", value: "sunset" },
            ],
        },
    ],
};
