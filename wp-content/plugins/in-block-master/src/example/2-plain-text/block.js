import { PLUGIN_NAME } from '../../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { PlainText } = wp.blockEditor

const BLOCK_NAME = `${PLUGIN_NAME}/plain-text`

registerBlockType(BLOCK_NAME, {
  title: __('Example'),
  description: __('Example block!'),
  icon: 'nametag',
  category: 'common',
  attributes: {
    mageUrl: {
      type: 'string'
    },
    imageId: {
      type: 'integer'
    },
    title: {
      type: 'string'
    },
    subtitle: {
      type: 'string'
    }
  },

  edit: props => {
    const { attributes: { imageUrl, imageId,title, subtitle }, setAttributes, className } = props
    const classNameContainer = className + '__container'
    return(
      <>
        <div className="d-flex">
          <div className="col-1">
            <PlainText
              keepplaceholderonfocus="true"
              placeholder={ __( 'Title') }
              className={ className }
              value={title}
              onChange={ (title) => {
                setAttributes( { title: title } )
              } }
            />
            <PlainText
              keepplaceholderonfocus="true"
              placeholder={ __( 'Subtitle') }
              className={ className }
              value={subtitle}
              onChange={ (param1) => {
                setAttributes( { subtitle: param1 } )
              } }
            />
          </div>
          <div className="col-2">
            <div className={className + '__image'}>
              {imageUrl ? (
                  <img src={imageUrl} alt='' />
              ) : (
                  <MediaPlaceholder
                      onSelect={(media) => setAttributes({ imageUrl: media.url, imageId: media.id })}
                      allowedTypes={['image']}
                      multiple={false}
                      labels={{ title: 'The Image' }}
                  />
              )}
            </div>
          </div>
        </div>
      </>
    )
  },

  save: ({ attributes: { title, subtitle } }) => (
      <div>
        <section className="section1">
          <div>
            <div>
              <h1 className="Exploitez-enfin-tout">{title}</h1>
              <h2 className="Solutions-et-outils">{subtitle}</h2>
            </div>
            <div className="img">
              {imageUrl && <img src={imageUrl} className="illu-principale"/>}
            </div>
          </div>
        </section>
      </div>
  )
})
