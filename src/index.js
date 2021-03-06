const { Plugin } = require('@uppy/core')
const { h } = require('preact')

/**
 * Progress bar
 *
 */
module.exports = class UppyCrop extends Plugin {
  constructor (uppy, opts) {
    super(uppy, opts)
    this.id = this.opts.id || 'UppyCrop'
    this.title = 'Uppy crop'
    this.type = 'cropper'

    // set default options
    const defaultOptions = {
      target: 'body',
      replaceTargetContent: false,
      fixed: false,
      hideAfterFinish: true
    }

    // merge default options with the ones set by user
    this.opts = Object.assign({}, defaultOptions, opts)

    this.render = this.render.bind(this)
  }

  render (state) {
    const progress = state.totalProgress || 0
    const isHidden = progress === 100 && this.opts.hideAfterFinish
    return (
      <div
        class="uppy uppy-ProgressBar"
        style={{ position: this.opts.fixed ? 'fixed' : 'initial' }}
        aria-hidden={isHidden}
      >
        <div class="uppy-ProgressBar-inner" style={{ width: progress + '%' }} />
        <div class="uppy-ProgressBar-percentage">{progress}</div>
      </div>
    )
  }

  install () {
    const target = this.opts.target
    if (target) {
      this.mount(target, this)
    }
  }

  uninstall () {
    this.unmount()
  }
}
