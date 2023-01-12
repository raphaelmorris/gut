/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	useBlockProps,
	RichText,
	InnerBlocks,
	AlignmentControl,
	BlockControls,
	BlockIcon,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes, className, clientId }) {

	let activeTabIndex = 0;
	const tabBar = (tabs) => {
		return (
			tabs.sort((a, b) => a.index - b.index).map(tab => {
				return (
					<div data-tab = {tab.index} data-name={tab.title} className= {tab.index == activeTabIndex ? 'tab-filter active current' : 'tab-filter'}>
					<RichText.Content
								tagName="a"
								value={tab.title}
							/>
					</div>


					/*<div className="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabindex={tab.index} 	>
						<span className="mdc-tab__content">
							<RichText.Content
								tagName="span"
								className="mdc-tab__text-label"
								value={tab.title}
							/>
						</span>
						<span className={tab.index == activeTabIndex ? 'mdc-tab-indicator mdc-tab-indicator--active' : 'mdc-tab-indicator'}>
							<span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
						</span>
						<span className="mdc-tab__ripple"></span>
					</div>*/
				)
			})
		)
	}

	const tabBarSelect = (tabs) => {
		return (
			tabs.sort((a, b) => a.index - b.index).map(tab => {
				return (
					<RichText.Content
						tagName="option"
						className="tabsMobile dropdown"
						value={tab.title}
						data-id={tab.index}
					/>
				)
			})
		)
	}

	const blockProps = useBlockProps.save();
	return (
		<div>
			<div id="tabs"></div>
			<div class="container">
				<section class="tabs desktop">
					{tabBar(attributes.tabs)}
				</section>

				<section className="tabsMobile dropdown">
					<select class="">
						{tabBarSelect(attributes.tabs)}
					</select>
				</section>
			</div>
			<InnerBlocks.Content />
		</div>


	);
}
