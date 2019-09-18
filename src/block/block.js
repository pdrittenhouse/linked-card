/**
 * BLOCK: linked-card
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { createElement } = wp.element;
const {
	InnerBlocks,
	InspectorControls,
} = wp.editor;
const {
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
} = wp.components;
const { withState } = wp.compose;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-linked-card', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Linked Card' ), // Block title.
	icon: 'format-aside',
	category: 'common',
	keywords: [
		__( 'linked-card' ),
		__( 'Linked Card' ),
		__( 'Linked Content' ),
	],
	attributes: {
		cardURL: {
			type: 'string',
			source: 'attribute',
			selector: '.card-link',
			attribute: 'href',
		},
		urlTarget: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'target',
			default: '_self',
			state: false,
		},
	},
	edit: ( props ) => {
		let { attributes: {
			cardURL,
		}, setAttributes, className } = props;
		const onChangeURL = ( newURL ) => {
			props.setAttributes( { cardURL: newURL } );
		};
		let tabState = props.attributes.urlTarget !== '_self';
		const NewTabToggle = withState( {
			newTab: tabState,
		} )( ( { newTab, setState } ) => (
			<ToggleControl
				label="Open in new tab?"
				help={ newTab ? 'Open in new tab.' : 'Open in same tab.' }
				checked={ newTab }
				onChange={ ( thisState ) => {
					setState( ( state ) => ( { newTab: ! state.newTab } ) );
					thisState ? props.attributes.urlTarget = '_blank' : props.attributes.urlTarget = '_self';
					tabState = props.attributes.urlTarget !== '_self';
				} }
			/>
		) );

		return [
			<InspectorControls key={ props }>
				<PanelBody title={ __( 'Card URL' ) } >
					<PanelRow>
						<TextControl
							label="URL"
							onChange={ onChangeURL }
							value={ cardURL }
						/>
					</PanelRow>
					<PanelRow>
						<NewTabToggle />
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			(
				<div className={ props.className }>

					<InnerBlocks />

					<div className="edit-meta">
						<span className={ 'card-url' }>{ props.attributes.cardURL }</span>
						<span className={ 'url-target tab' + props.attributes.urlTarget }> </span>
					</div>

				</div>

			) ];
	},
	save: ( props ) => {
		return (
			<div className={ props.attributes.className }>
				<a href={ props.attributes.cardURL } className={ 'card-link' } target={ props.attributes.urlTarget }>
					<InnerBlocks.Content />
				</a>
			</div>
		);
	},
} );
