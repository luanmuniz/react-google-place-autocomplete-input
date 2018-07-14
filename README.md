React Google Place Autocomplete input
===================
A Input React Component for Google Place AutoComplete

The maintainers of the project are:
- [Luan Muniz](http://github.com/luanmuniz)
- [Arjun Komath](http://github.com/arjunkomath)

## Install

`npm i react-google-place-autocomplete-input`

## Using

```javascript
import React from 'react';
import GooglePlaceSearchInput from 'react-google-place-autocomplete-input';

export default React.createClass({
    render() {
        return (
			<GooglePlaceSearchInput
				onChange={console.log}
				onPlaceSelected={console.log}
				onRemove={console.log}
			/>
        );
    }
});
```

## General notes

- In lieu of a formal styleguide, take care to maintain the existing coding style and please do follow the guideline
- Add unit tests for any new or changed functionality.
- Lint and test your code using `npm test`.

And please:

### Always run `npm test` before sending a PR

## Sending Pull-Requests

If you fixed or added something useful to the project, you can send pull-request. It will be reviewed by maintainer and accepted, or commented for rework, or declined. If you a new and don't know what you should do to send a PR, please see [this tutorial](https://gist.github.com/luanmuniz/da0b8d2152c4877f93c4)

Before sending you Pull Request please don't forget to check your code with `npm test`. PR that don't pass tests will not be accept
