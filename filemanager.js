(function () {

  const template = document.createElement("template");

  template.innerHTML = `
    <style>
      :host {
        display: block;
        font-family: Arial, sans-serif;
        border: 1px solid #ccc;
        padding: 10px;
      }

      button {
        margin-top: 8px;
      }

      ul {
        margin-top: 10px;
      }
    </style>

    <input type="file" id="fileInput"/>
    <button id="uploadBtn">Upload</button>

    <h4>Files</h4>
    <ul id="fileList"></ul>
  `;

  class FileManager extends HTMLElement {

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {

      const uploadBtn = this.shadowRoot.getElementById("uploadBtn");
      const fileInput = this.shadowRoot.getElementById("fileInput");

      uploadBtn.addEventListener("click", async () => {

        const file = fileInput.files[0];

        if (!file) {
          alert("Choose a file first");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);

        await fetch("http://localhost:3000/api/files/upload", {
          method: "POST",
          body: formData
        });

        this.loadFiles();

      });

      this.loadFiles();
    }

    async loadFiles() {

      const response = await fetch("http://localhost:3000/api/files");
      const files = await response.json();

      const list = this.shadowRoot.getElementById("fileList");
      list.innerHTML = "";

      files.forEach(file => {

        const li = document.createElement("li");

        const link = document.createElement("a");
        link.textContent = file.filename;

        link.href = `http://localhost:3000/api/files/${file.id}/download`;
        link.target = "_blank";

        li.appendChild(link);
        list.appendChild(li);

      });
    }

  }

  customElements.define("file-manager-widget", FileManager);

})();