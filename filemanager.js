(function () {
  const template = document.createElement("template");

  template.innerHTML = `
    <style>
      :host {
        display: block;
        font-family: Arial, sans-serif;
        border: 1px solid #ccc;
        padding: 10px;
        background: white;
      }
    </style>

    <div>File Manager widget loaded successfully.</div>
  `;

  class FileManager extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  customElements.define("file-manager-widget", FileManager);
})();
