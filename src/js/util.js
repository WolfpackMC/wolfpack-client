export const openExternal = (url, ctx) => {
  ctx.setPopUp({
    visible: true,
    message: `You are about to open this external link: **${url}**. Are you sure?`,
    type: "warning",
    options: [
      {
        id: 0,
        text: "Yeah, I'm sure.",
        action: () => {
          window.wolfpack.ipc.send("open-external", url);
        },
      },
      {
        id: 1,
        text: "Nope, I'm not sure.",
        action: () => {},
      },
    ],
  });
};
