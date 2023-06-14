export default {
  type: "carousel",
  contents: [
    {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "image",
            url: "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip1.jpg",
            size: "full",
            aspectMode: "cover",
            aspectRatio: "2:3",
            gravity: "top",
          },
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "這是標題",
                    size: "xl",
                    color: "#ffffff",
                    weight: "bold",
                  },
                ],
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "filler",
                  },
                  {
                    type: "box",
                    layout: "baseline",
                    contents: [
                      {
                        type: "filler",
                      },
                      {
                        type: "text",
                        text: "Watch Video",
                        color: "#ffffff",
                        flex: 0,
                        offsetTop: "-2px",
                      },
                      {
                        type: "filler",
                      },
                    ],
                    spacing: "sm",
                    action: {
                      type: "uri",
                      label: "action",
                      uri: "https://www.baidu.com/",
                    },
                  },
                  {
                    type: "filler",
                  },
                ],
                borderWidth: "1px",
                cornerRadius: "4px",
                spacing: "sm",
                borderColor: "#ffffff",
                margin: "xxl",
                height: "40px",
              },
            ],
            position: "absolute",
            offsetBottom: "0px",
            offsetStart: "0px",
            offsetEnd: "0px",
            backgroundColor: "#333333AA",
            paddingAll: "20px",
            paddingTop: "18px",
          },
        ],
        paddingAll: "0px",
      },
    },
  ],
};
