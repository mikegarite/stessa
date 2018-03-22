import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

 
const style = {
  marginLeft: 20,
};


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  floating: {
  	position : 'Absolute',
  	bottom: 10,
  	right:10
  }
};

	const toAddress = {
		  name: 'mike',
		  street1: '179 N Harbor Dr',
		  city: 'Redondo Beach',
		  state: 'CA',
		  zip: '90277',
		  country: 'US',
		  phone: '310-808-5243'
		};

	const fromAddress = {		
		  name: 'EasyPost',
		  street1: '118 2nd Street',
		  street2: '4th Floor',
		  city: 'San Francisco',
		  state: 'CA',
		  zip: '94105',
		  phone: '415-123-4567'
	}

	const parcel = {
		  length: 20.2,
		  width: 10.9,
		  height: 5,
		  weight: 65.9
	}

	const customsInfo = { 
		 eel_pfc: 'NOEEI 30.37(a)',
	     customs_certify: true,
	     customs_signer: 'Steve Brule',
	     contents_type: 'merchandise',
	     contents_explanation: '',
	     restriction_type: 'none',
	     restriction_comments: '',
	     non_delivery_option: 'abandon',
	}





const API = 'http://localhost:8080/api/';
const SHIPMENT_API = API+'/shipment'
const ORDER_API = API+'/order'

class App extends Component {

  constructor(props) {
    super(props);

    console.log(this.refs)

    this.state = {
      toAddress: {
      	country : 'US'
      },
      fromAddress:{},
      parcel:{}

    };
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this._allFieldsSubmitted = this._allFieldsSubmitted.bind(this);
    this._sendPackageInfo = this._sendPackageInfo.bind(this);
    this._prefilldata = this._prefilldata.bind(this);
    this._sendOrder = this._sendOrder.bind(this);
  }

  componentDidMount() {


  }


   _handleTextFieldChange = function(e) {
   		e.persist();
        let object = e.target.attributes.getNamedItem('data-object').value;
        let key = e.target.attributes.getNamedItem('data-key').value;
        this.setState({
		  [object]: Object.assign({}, this.state[object], {[key]: e.target.value})
		}, () => {
      		console.log("New state in ASYNC callback:", this.state);
    	});
		
    }

    _allFieldsSubmitted = function(){
    	if(
    	   this.state.toAddress.name && 
    	   this.state.toAddress.street1 && 
    	   this.state.toAddress.city && 
    	   this.state.toAddress.state && 
    	   this.state.toAddress.zip && 
    	   this.state.fromAddress.name && 
    	   this.state.fromAddress.street1 && 
    	   this.state.fromAddress.city && 
    	   this.state.fromAddress.state && 
    	   this.state.fromAddress.zip && 
    	   this.state.parcel.height && 
    	   this.state.parcel.width && 
    	   this.state.parcel.length && 
    	   this.state.parcel.weight
    	   ){
    		return false;
    	}
    	else{
    		return true;	
    	}
    	
    }

    _sendPackageInfo = function (){
    	  

  	 fetch(SHIPMENT_API,{
	    method: 'POST',
	    body: JSON.stringify({
	      toAddress: toAddress,
	      fromAddress : fromAddress,
	      parcel : parcel
	    }),
	    headers: {"Content-Type": "application/json"}
	  })
	  .then((response) => {
	    return response.json()
	  }).then((body)=>{
	  	console.log(body.shipping_id);
	    this.setState({
	    	shippingId : body.shipping_id
	    })
	  });
	    
    }

    _prefilldata = function(){
    	this.setState({
		  toAddress: toAddress,
		  fromAddress: fromAddress,
		  parcel: parcel
		});
    }

    _sendOrder = function(){
      fetch(ORDER_API,{
	    method: 'POST',
	    body: JSON.stringify({
	      shippingId: this.state.shippingId,
	      toAddress: this.state.toAddress,
	      fromAddress: this.state.fromAddress
	    }),
	    headers: {"Content-Type": "application/json"}
	  })
	  .then((response) => {
	    return response.json()
	  }).then((body)=>{
	  	console.log(body);
	    // this.setState({
	    // 	shippingId : body.shipping_id
	    // })
	  });
    }

  render() {
    //const { hits } = this.state;

    return (
      <div>
        
        <Tabs>
    <Tab label="To Address" >
      <div>
        <h2 style={styles.headline}>Where's it going?</h2>
        <Paper zDepth={2}>
		    <TextField value={this.state.toAddress.name} data-object="toAddress" data-key="name" onChange={this._handleTextFieldChange.bind(this)} hintText="What's their name?" style={style} underlineShow={false} />
		    <Divider />
		    <TextField value={this.state.toAddress.street1} hintText="What's their street address?" data-object="toAddress" data-key="street1" onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		    <TextField value={this.state.toAddress.city} hintText="What's their city?" data-object="toAddress" data-key="city" onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		    <TextField value={this.state.toAddress.state} hintText="What's their State?" data-object="toAddress" data-key="state" onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		    <TextField value={this.state.toAddress.zip} hintText="What's their ZIP?" data-object="toAddress" data-key="zip" onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		    <TextField value={this.state.toAddress.phone} hintText="What's their phone number?" data-object="toAddress" data-key="phone" onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		</Paper>
      </div>
    </Tab>
    <Tab label="From Address" >
      <div>
        <h2 style={styles.headline}>Where's it shipping from?</h2>
        <Paper zDepth={2}>
		    <TextField value={this.state.fromAddress.name} hintText="What's your name?" data-object="fromAddress" data-key="name" onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		    <TextField value={this.state.fromAddress.street1} hintText="What's your street address?" data-object="fromAddress" data-key="street1"  onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		    <TextField value={this.state.fromAddress.street2} hintText="Additional Address Details?" data-object="fromAddress" data-key="street2"  onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		    <TextField value={this.state.fromAddress.city} hintText="What's your city?"  data-object="fromAddress" data-key="city"  onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		    <TextField value={this.state.fromAddress.state} hintText="What's your state?"data-object="fromAddress" data-key="state"  onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		    <TextField value={this.state.fromAddress.zip} hintText="What's your zip?"  data-object="fromAddress" data-key="zip"  onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		    <TextField value={this.state.fromAddress.phone} hintText="What's your phone number?" data-object="fromAddress" data-key="phone"   onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		</Paper>
      </div>
    </Tab>
    <Tab label="Package Details">
      <div>
        <h2 style={styles.headline}>Package Details</h2>
        <Paper zDepth={2}>
		    <TextField value={this.state.parcel.length} hintText="Length of package" data-object="parcel" data-key="length"  onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		    <TextField value={this.state.parcel.width} hintText="Width of package" data-object="parcel" data-key="width"  onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		    <TextField value={this.state.parcel.height} hintText="Height of package" data-object="parcel" data-key="height"  onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		    <TextField value={this.state.parcel.weight} hintText="Package Weight" data-object="parcel" data-key="weight"  onChange={this._handleTextFieldChange.bind(this)} style={style} underlineShow={false} />
		    <Divider />
		</Paper>
      </div>
    </Tab>
  </Tabs>
  <RaisedButton label="Submit" disabled={this._allFieldsSubmitted()} onClick={this._sendPackageInfo.bind(this)} fullWidth={true} />


  <TextField value={this.state.shippingId} hintText="shipping id" style={style} underlineShow={false} />
  <RaisedButton label="Send Order" disabled={!this.state.shippingId} onClick={this._sendOrder.bind(this)} fullWidth={true} />

  

  <FloatingActionButton style={styles.floating} onClick={this._prefilldata.bind(this)}>
  <ContentAdd />
  </FloatingActionButton>


      </div>
    );
  }
}
export default App;
