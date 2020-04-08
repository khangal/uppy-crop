const { Plugin } = require("@uppy/core")
const { h } = require("preact")
const Cropper = require("cropperjs")
const findDOMElement = require('@uppy/utils/lib/findDOMElement')

class UppyCrop extends Plugin {
  constructor (uppy, opts) {
    super(uppy, opts)
    this.id = this.opts.id || 'UppyCrop'
    this.title = 'Uppy crop'
    this.type = 'cropper'
    this.cropper = null

    // set default options
    const defaultOptions = {
      target: 'body',
      replaceTargetContent: false,
      fixed: false,
      hideAfterFinish: true
    }

    // merge default options with the ones set by user
    this.opts = Object.assign({}, defaultOptions, opts)

    this.onFileAdded = this.onFileAdded.bind(this)
    this.onFileRemoved = this.onFileRemoved.bind(this)
    this.render = this.render.bind(this)
  }

  render() {
    const isCropping = this.cropper !== null
    console.log("----------------------------")
    console.log(isCropping, "am i cropping")
    console.log("----------------------------")

    return (
      <div>
        <div id="crop-area">
        </div>

        {isCropping &&
            <div>
              <button onClick={this.onCancelCrop} class="v-btn v-btn--contained theme--light v-size--small primary">cancel</button>
              <button onClick={this.onSaveCrop} class="v-btn v-btn--contained theme--light v-size--small primary">Save crop</button>
            </div>
        }
      </div>
    )
  }

  onFileAdded(file) {
    const domElement = findDOMElement("#crop-area")

    let img = document.createElement('img')
    img.src = URL.createObjectURL(file.data)
    const newChild = domElement.appendChild(img)

    const cropper = new Cropper(newChild, this.opts.cropperjs)

    this.cropper = cropper
  }

  onFileRemoved(file) {
    console.log("----------------------------")
    console.log(file)
    console.log("----------------------------")
  }

  onSaveCrop(e) {
    e.preventDefault()

    console.log("----------------------------")
    console.log("on save crop")
    console.log("----------------------------")
  }

  onCancelCrop(e) {
    e.preventDefault()
    this.cropper = null
    console.log("----------------------------")
    console.log("onCancelCrop")
    console.log("----------------------------")
  }

  install () {
    this.uppy.on('file-added', this.onFileAdded)

    const target = this.opts.target
    if (target) {
      this.mount(target, this)
    }
  }

  uninstall () {
    this.unmount()
    this.uppy.off('file-removed', this.onFileRemoved)
  }
}

module.exports = {
  UppyCrop
}
