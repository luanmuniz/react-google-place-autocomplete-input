'use strict'

import { storiesOf } from '@storybook/react';
import React, { Component } from 'react';
import GooglePlaceSearchInput from './index';

const stories = storiesOf('GooglePlaceSearchInput', module);

stories.add('without props', () => (
	<GooglePlaceSearchInput
		apiKey='AIzaSyAwCw6fUCNox56uLzIauGKhYvVqj40s8Z4'
		onChange={console.log}
		onPlaceSelected={console.log}
		onRemove={console.log}
		value={'Test City'}
	/>
));
