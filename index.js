import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import 'whatwg-fetch';

import styles from './styles.css';

export default class GooglePlaceSearchInput extends React.Component {

	static propTypes = {
		apiKey: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onPlaceSelected: PropTypes.func.isRequired,
		value: PropTypes.string.isRequired,
		inputClassName: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
		containerClassName: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
		autoCompleteContainerClassName: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
		resultClassName: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
		numberResults: PropTypes.number
	}

	static defaultProps = {
		numberResults: 5
	}

	constructor(props) {
		super(props);

		this.poweredImage = 'https://developers.google.com/places/documentation/images/powered-by-google-on-white.png';

		this.state = {
			inputValue: props.value,
			placeResults: []
		};
	}

	_getPlace = async (inputValue) => {
		const googleApiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${this.props.apiKey}&input=${inputValue}`;
		const googleLocationUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid={{placeId}}`;

		return fetch(new Request(googleApiUrl), {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		})
		.then(res => res.text())
		.then(googleResult => {
			console.log('googleResult', googleResult);
			if(googleResult.status !== 'OK') {
				console.error('ERROR');
			}

			this.setState({
				placeResults: (googleResult.predictions || []).slice(0, this.props.numberResults)
			});

			return googleResult;
		})
		.catch(console.error)
	}

	_onChange = async (event) => {
		event.preventDefault();

		this.setState({
			inputValue: event.target.value
		});

		const googleResult = await this._getPlace(event.target.value);

		return this.props.onChange(event, googleResult);
	}

	_onClick = (event) => {
		event.preventDefault();

		const placeId = event.target['data-placeId'];

		this.setState({
			inputValue: event.target.innerHTML,
			placeResults: []
		});

		return this.props.onPlaceSelected(event, placeId);
	}

	render() {
		return <div className={classNames([ styles.searchContainer, this.props.containerClassName ])}>
			<input value={this.state.inputValue} onChange={this._onChange} className={classNames([ styles.searchInout, this.props.inputClassName ])} />
			{!!this.state.placeResults.length &&
				<div className={classNames([ styles.autoCompleteContainer, this.props.autoCompleteContainerClassName ])}>
					{this.state.placeResults.map(thisPrediction => {
						return <div className={classNames([ styles.searchResult, this.props.resultClassName ])} onClick={this._onClick} id={thisPrediction.id} data-placeId={thisPrediction.place_id}>
							{thisPrediction.description}
						</div>
					})}
					<div className={classNames([ styles.searchResult, styles.poweredByGoogle, this.props.resultClassName ])}><img src={this.poweredImage} /></div>
				</div>
			}
		</div>
	}

};
