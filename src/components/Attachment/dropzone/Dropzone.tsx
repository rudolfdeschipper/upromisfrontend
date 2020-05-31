import React, { Component } from "react";
import "./Dropzone.css";

interface IProps {
  onFilesAdded: any
}

interface IState {
  hightlight: boolean,
}

class Dropzone extends Component<IProps, IState> {
  private fileInputRef = React.createRef<HTMLInputElement>();

  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = { hightlight: false };
    this.fileInputRef = React.createRef();

    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  openFileDialog() {
    this.fileInputRef.current!.click();
  }

  onFilesAdded(event: React.FormEvent<HTMLInputElement>) {
    console.log('in Dropzone/onFileAdded');
    const files = event.currentTarget.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files!);
      console.log(array);
      this.props.onFilesAdded(array);
    }
  }

  onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    this.setState({ hightlight: true });
  }

  onDragLeave(event: React.DragEvent<HTMLDivElement>) {
    this.setState({ hightlight: false });
  }

  onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      console.log(array);
      this.props.onFilesAdded(array);
    }
    this.setState({ hightlight: false });
  }

  fileListToArray(list: FileList) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  render() {
    return (
      <div
        className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
        <span>Drop Files here</span>
      </div>
    );
  }
}

export default Dropzone;
