import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';

import styles from './styles.css';

function debounce(fn, delay) {
	let timer = null;
	return function () {
		let context = this, args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(context, args);
		}, delay);
	};
}
export default class GooglePlaceSearchInput extends React.Component {

	static propTypes = {
		apiKey: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onPlaceSelected: PropTypes.func.isRequired,
		onRemove: PropTypes.func,
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

		this._getPlace = debounce(this._getPlace, 300)
	}

	_getPlace = async inputValue => {
		const googleApiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${this.props.apiKey}&input=${inputValue}`;
		// const googleLocationUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid={{placeId}}`;

		return axios({
			method: 'get',
			url: googleApiUrl,
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		}).then(googleResult => {
			console.log('googleResult', googleResult.data);
			if (googleResult.statusText !== 'OK') {
				console.error('ERROR');
			}

			this.setState({
				placeResults: (googleResult.data.predictions || []).slice(0, this.props.numberResults)
			});

			return googleResult.data
		}).catch(console.error);
	};

	_onChange = async (event) => {
		event.preventDefault();

		this.setState({
			inputValue: event.target.value
		});

		const googleResult = await this._getPlace(event.target.value);

		return this.props.onChange(event, googleResult);
	}

	_onClick = (event, place) => {
		event.preventDefault();

		this.setState({
			inputValue: event.target.innerHTML,
			placeResults: []
		});

		return this.props.onPlaceSelected(place);
	}

	_removeLocation = (event) => {
		this.setState({
			inputValue: '',
			placeResults: []
		});

		if (this.props.onRemove) {
			return this.props.onRemove(event);
		}
	}

	renderSearchIcon = () => <div className={styles.searchIcon}>
		<svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 451 451">
			<g>
				<path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3
					s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4
					C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3
					s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z"/>
			</g>
		</svg>
	</div>

	render() {
		return <div className={classNames([styles.searchContainer, this.props.containerClassName])}>
			<div className={styles.searchInputContainer}>
				{this.renderSearchIcon()}
				<input value={this.state.inputValue} onChange={this._onChange} className={classNames([styles.searchInput, this.props.inputClassName])} />
			</div>
			<div className={classNames([styles.poweredByGoogle, this.props.resultClassName])}><img src={this.poweredImage} /></div>
			{!!this.state.placeResults.length &&
				<div className={classNames([styles.autoCompleteContainer, this.props.autoCompleteContainerClassName])}>
					{this.state.placeResults.map(thisPrediction => {
						return <div key={thisPrediction.id} className={classNames([styles.searchResult, this.props.resultClassName])} onClick={(evt) => this._onClick(evt, thisPrediction)} id={thisPrediction.id}>
							{thisPrediction.description}
						</div>
					})}
					<div className={classNames([styles.searchResult, styles.removeLocation])} onClick={this._removeLocation}>
						Remove location
					</div>
				</div>
			}
		</div>
	}

};
