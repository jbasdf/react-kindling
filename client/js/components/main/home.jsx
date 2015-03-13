"use strict";

import ReactS3Uploader from 'react-s3-uploader';
import React from 'react';

export default React.createClass({
  render(){
    return (<div>
    	<h2>Home</h2>
    	<ReactS3Uploader
		    signingUrl="/s3/sign"
		    accept="image/*"
		    onProgress={this.onUploadProgress}
		    onError={this.onUploadError}
		    onFinish={this.onUploadFinish}
		    className="foo"/>
    </div>);
  }
});