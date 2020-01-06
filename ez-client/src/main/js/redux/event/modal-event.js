const ModalEvent = {
  ShowModal: "SHOW_MODAL",
  HideModal: "HIDE_MODAL"
};

const ModalEventCreator = {
  hideModal: () => {
    return {
      type: ModalEvent.HideModal

    }
  },
  showModal: (modalComponent) => {
    return {
      type: ModalEvent.ShowModal,
      payload: modalComponent
    }
  }
};

export {
  ModalEvent,
  ModalEventCreator
}

