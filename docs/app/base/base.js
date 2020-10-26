class Base {

  confirmRefresh() {
    window.onbeforeunload = () =>{
      return '';
    };
  }

  execute() {
    // this.confirmRefresh();
  }

}

export default Base;