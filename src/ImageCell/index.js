import React, { PureComponent } from "react";
import {
	View
} from "react-native";
import PropTypes from "prop-types";
import ImageComponent from "./ImageComponent";
import TouchableImageComponent from "./TouchableImageComponent";
import CustomImageUnit from "./CustomImageUnit";

export default class ImageCell extends PureComponent {
	static propTypes = {
		data: PropTypes.object.isRequired,
		source: PropTypes.any.isRequired,
		imageContainerStyle: PropTypes.object,
		customImageComponent: PropTypes.object,
		customImageProps: PropTypes.object,
		completeCustomComponent: PropTypes.func,
		onPressImage: PropTypes.func,
		onLongPressImage: PropTypes.func,
		renderIndividualHeader: PropTypes.func,
		renderIndividualFooter: PropTypes.func
	}

	_renderImage = () => {
		const {
			data, source, imageContainerStyle, onPressImage,
			onLongPressImage, customImageComponent,
			customImageProps
		} = this.props;
		const { width, height, gutter } = data.masonryDimensions;

		return onPressImage || onLongPressImage
			? <TouchableImageComponent
				data={data}
				width={width}
				height={height}
				gutter={gutter}
				source={source}
				imageContainerStyle={imageContainerStyle}
				customImageComponent={customImageComponent}
				customImageProps={customImageProps}

				onPressImage={onPressImage}
				onLongPressImage={onLongPressImage}
			/>
			: <ImageComponent
				width={width}
				height={height}
				gutter={gutter}
				source={source}
				imageContainerStyle={imageContainerStyle}
				customImageComponent={customImageComponent}
				customImageProps={customImageProps}
			/>;
	}

	_renderCustomImage = () => {
		const {
			data, source, completeCustomComponent
		} = this.props;
		const { width, height, gutter } = data.masonryDimensions;

		return (
			<CustomImageUnit
				data={data}
				width={width}
				height={height}
				gutter={gutter}
				source={source}
				completeCustomComponent={completeCustomComponent}
			/>
		);
	}

	render() {
		const {
			data, renderIndividualHeader,
			renderIndividualFooter,
			completeCustomComponent
		} = this.props;

		const renderHeader = renderIndividualHeader &&
			renderIndividualHeader(data);
		const renderFooter = renderIndividualFooter &&
			renderIndividualFooter(data);

		return (
			<View>
				{renderHeader}
				{completeCustomComponent
					? this._renderCustomImage()
					: this._renderImage()}
				{renderFooter}
			</View>
		);
	}
}
