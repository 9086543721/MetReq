"use strict";if("undefined"==typeof jQuery||!jQuery)throw"ERROR: jQuery is required for fi.fmi.metoclient.metolib.WfsRequestParser!";if("undefined"==typeof _||!_)throw"ERROR: Lodash is required for fi.fmi.metoclient.metolib.WfsRequestParser!";var fi=fi||{};if(fi.fmi=fi.fmi||{},fi.fmi.metoclient=fi.fmi.metoclient||{},fi.fmi.metoclient.metolib=fi.fmi.metoclient.metolib||{},"undefined"==typeof fi.fmi.metoclient.metolib.Utils||!fi.fmi.metoclient.metolib.Utils)throw"ERROR: fi.fmi.metoclient.metolib.Utils is required for fi.fmi.metoclient.metolib.WfsRequestParser!";fi.fmi.metoclient.metolib.WfsRequestParser=function(){function a(){return{label:"",unit:"",phenomenon:"",statisticalFunction:"",statisticalPeriod:""}}function b(a,b){var c=a&&b&&a.hasOwnProperty(b);if(!c&&a&&b){var d=b.toLowerCase();for(var e in a)if(a.hasOwnProperty(e)&&e.toLowerCase()===d){a[b+""]=a[e],delete a[e],c=!0;break}}return c}function c(a,b,c){try{var e={info:{begin:void 0,end:void 0},locations:[],positions:{},gmlcovPositions:{srsDimension:void 0,timeIndex:void 0,contents:[]},data:[],parameters:[],propertiesContainer:{urls:[],properties:{}}},g=0,h=function(){++g},i=function(){g>0&&--g,0===g&&(g=-1,eb(c,d(e,b),b))};f(a,e,h,i,b),0===g&&i()}catch(j){"undefined"!=typeof console&&console&&console.error("ERROR: Error during synchronous data parsing flow!"),g=-1;var k={};k[ob.KEY_ERROR_TEXT]=j.toString(),b.push(k),eb(c,void 0,b)}}function d(c,d){var f={info:c.info,parameters:c.parameters,properties:c.propertiesContainer.properties,locations:[]};try{var g=c.gmlcovPositions.srsDimension||0,h=c.gmlcovPositions.contents||[],i=c.parameters.length;if(g>0&&c.data.length===i*(h.length/g)&&c.locations.length===fi.fmi.metoclient.metolib.Utils.objectLength(c.positions)){for(var j=0;j<c.locations.length;++j){var k=c.locations[j],l=k.pointRef,m="ERROR: Location and position data do not match!";if(!l)throw m;var n=c.positions[l];if(!n)throw m;f.locations.push({info:{id:k.id||"",geoid:k.geoid||"",wmo:k.wmo||"",fmisid:k.fmisid||"",name:k.name||n.name||"",region:k.region||"",country:k.country||"",timezone:k.timezone||"",position:n.position||""}})}for(var o=0;o<h.length;o+=g){for(var p={time:parseInt(h[o+g-1],10)*ob.EPOCH_TO_MS,values:{}},q=0;q<f.parameters.length;++q){var r=f.parameters[q];r&&(p.values[r]=parseFloat(c.data[o/g*i+q]),b(f.properties,r)&&f.properties[r]||("undefined"!=typeof console&&console&&console.error("ERROR: Server has not provided properties for request parameter!"),f.properties[r]=a()))}for(var s=0;s<f.locations.length;++s){for(var t=0,u=f.locations[s],v=0;v<u.info.position.length&&u.info.position[v]===h[o+v];++v)++t;if(u.info.position&&t===u.info.position.length){u.timeValuePairs||(u.timeValuePairs=[]),u.timeValuePairs.push(p);break}}}e(f.locations)}else if(0!==c.data.length||0!==h.length)throw"ERROR: Parsed lists do not match!"}catch(w){"undefined"!=typeof console&&console&&console.error("ERROR: Could not finalize data!"),f=void 0;var x={};x[ob.KEY_ERROR_TEXT]=w.toString(),d.push(x)}return f}function e(a){if(a&&a.length)for(var b=0;b<a.length-1;++b){for(var c=a[b],d=[],e=b+1;e<a.length;++e){var f=a[e];if(c.info.position.length===f.info.position.length){for(var g=c.info.position.length,h=!0,i=0;g>i;++i)if(c.info.position[i]!==f.info.position[i]){h=!1;break}h&&d.push(f)}}if(d.length)for(var j=c.timeValuePairs,k=j.length/(d.length+1),l=0;l<d.length;++l)d[l].timeValuePairs=j.splice(k,k)}}function f(a,b,c,d,e){a&&(S(a,e)||jQuery(a).children(ob.XML_WFS_FEATURE_COLLECTION).each(function(){g(this,b,c,d,e)}))}function g(a,b,c,d,e){jQuery(a).children(ob.XML_WFS_MEMBER).each(function(){h(this,b,c,d,e),i(this,b,c,d,e)})}function h(a,b,c,d,e){jQuery(a).children(ob.XML_OMSO_POINT_TIME_SERIES_OBSERVATION).each(function(){j(this,b.info,c,d,e),n(this,b.propertiesContainer,c,d,e),o(this,b,c,d,e),H(this,b,c,d,e)})}function i(a,b,c,d,e){jQuery(a).children(ob.XML_OMSO_GRID_SERIES_OBSERVATION).each(function(){j(this,b.info,c,d,e),n(this,b.propertiesContainer,c,d,e),o(this,b,c,d,e),H(this,b,c,d,e)})}function j(a,b,c,d,e){jQuery(a).children(ob.XML_OM_PHENOMENON_TIME).each(function(){k(this,b,c,d,e)})}function k(a,b,c,d,e){jQuery(a).children(ob.XML_GML_TIME_PERIOD).each(function(){l(this,b,c,d,e),m(this,b,c,d,e)})}function l(a,b){jQuery(a).children(ob.XML_GML_BEGIN_POSITION).each(function(){var a=jQuery.trim(jQuery(this).text());a&&(b.begin=new Date(a))})}function m(a,b){jQuery(a).children(ob.XML_GML_END_POSITION).each(function(){var a=jQuery.trim(jQuery(this).text());a&&(b.end=new Date(a))})}function n(a,b,c,d,e){jQuery(a).children(ob.XML_OM_OBSERVED_PROPERTY).each(function(){var a=jQuery.trim(jQuery(this).attr(ob.XML_ATTR_XLINK_HREF));a&&!_.contains(b.urls,a)&&(b.urls.push(a),fb(a,e,function(a){S(a,e)||a&&(V(a,b.properties,c,d,e),X(a,b.properties,c,d,e)),d()}),c())})}function o(a,b,c,d,e){jQuery(a).children(ob.XML_OM_FEATURE_OF_INTEREST).each(function(){p(this,b,c,d,e)})}function p(a,b,c,d,e){jQuery(a).children(ob.XML_SAMS_SF_SPATIAL_SAMPLING_FEATURE).each(function(){q(this,b.locations,c,d,e),A(this,b.positions,c,d,e)})}function q(a,b,c,d,e){jQuery(a).children(ob.XML_SAM_SAMPLED_FEATURE).each(function(){r(this,b,c,d,e)})}function r(a,b,c,d,e){jQuery(a).children(ob.XML_TARGET_LOCATION_COLLECTION).each(function(){s(this,b,c,d,e)})}function s(a,b,c,d,e){jQuery(a).children(ob.XML_TARGET_MEMBER).each(function(){t(this,b,c,d,e)})}function t(a,b,c,d,e){jQuery(a).children(ob.XML_TARGET_LOCATION).each(function(){var a={};u(this,a,c,d,e),v(this,a,c,d,e),w(this,a,c,d,e),x(this,a,c,d,e),y(this,a,c,d,e),z(this,a,c,d,e),b.push(a)})}function u(a,b){jQuery(a).children(ob.XML_GML_IDENTIFIER).each(function(){b.id=jQuery.trim(jQuery(this).text());var a=jQuery.trim(jQuery(this).attr(ob.XML_ATTR_CODE_SPACE));ob.XML_ATTR_CODE_SPACE_FMISID===a&&(b.fmisid=jQuery.trim(jQuery(this).text()))})}function v(a,b){jQuery(a).children(ob.XML_GML_NAME).each(function(){var a=jQuery.trim(jQuery(this).attr(ob.XML_ATTR_CODE_SPACE));ob.XML_ATTR_CODE_SPACE_NAME===a?b.name=jQuery.trim(jQuery(this).text()):ob.XML_ATTR_CODE_SPACE_WMO===a?b.wmo=jQuery.trim(jQuery(this).text()):ob.XML_ATTR_CODE_SPACE_GEOID===a&&(b.geoid=jQuery.trim(jQuery(this).text()))})}function w(a,b){jQuery(a).children(ob.XML_TARGET_REGION).each(function(){b.region=jQuery.trim(jQuery(this).text())})}function x(a,b){jQuery(a).children(ob.XML_TARGET_COUNTRY).each(function(){b.country=jQuery.trim(jQuery(this).text())})}function y(a,b){jQuery(a).children(ob.XML_TARGET_TIMEZONE).each(function(){b.timezone=jQuery.trim(jQuery(this).text())})}function z(a,b){jQuery(a).children(ob.XML_TARGET_REPRESENTATIVE_POINT).each(function(){b.pointRef=jQuery.trim(jQuery(this).attr(ob.XML_ATTR_XLINK_HREF)),b.pointRef&&b.pointRef.charAt(0)===ob.XML_REF_PREFIX&&(b.pointRef=b.pointRef.slice(1))})}function A(a,b,c,d,e){jQuery(a).children(ob.XML_SAMS_SHAPE).each(function(){C(this,b,c,d,e)})}function B(a,b,c,d,e){jQuery(a).children(ob.XML_GML_POINT).each(function(){var a=this,f=jQuery.trim(jQuery(a).attr(ob.XML_ATTR_GML_ID));if(f){b[f]||(b[f]={name:"",position:[]});var g=b[f];F(this,g,c,d,e),G(this,g.position,c,d,e)}})}function C(a,b,c,d,e){jQuery(a).children(ob.XML_GML_MULTI_POINT).each(function(){D(this,b,c,d,e),E(this,b,c,d,e)})}function D(a,b,c,d,e){jQuery(a).children(ob.XML_GML_POINT_MEMBER).each(function(){B(this,b,c,d,e)})}function E(a,b,c,d,e){jQuery(a).children(ob.XML_GML_POINT_MEMBERS).each(function(){B(this,b,c,d,e)})}function F(a,b){jQuery(a).children(ob.XML_GML_NAME).each(function(){b.name=jQuery.trim(jQuery(this).text())})}function G(a,b){jQuery(a).children(ob.XML_GML_POS).each(function(){var a=jQuery.trim(jQuery(this).text());a&&b.push.apply(b,a.split(ob.REGEX_WHITE_SPACE))})}function H(a,b,c,d,e){jQuery(a).children(ob.XML_OM_RESULT).each(function(){I(this,b,c,d,e)})}function I(a,b,c,d,e){jQuery(a).children(ob.XML_GMLCOV_MULTI_POINT_COVERAGE).each(function(){M(this,b,c,d,e),P(this,b,c,d,e),J(this,b,c,d,e)})}function J(a,b,c,d,e){jQuery(a).children(ob.XML_GMLCOV_RANGE_TYPE).each(function(){K(this,b,c,d,e)})}function K(a,b,c,d,e){jQuery(a).children(ob.XML_SWE_DATA_RECORD).each(function(){L(this,b.parameters,c,d,e)})}function L(a,b){jQuery(a).children(ob.XML_SWE_FIELD).each(function(){var a=jQuery.trim(jQuery(this).attr(ob.XML_ATTR_NAME));a&&!_.contains(b,a)&&b.push(a)})}function M(a,b,c,d,e){jQuery(a).children(ob.XML_GML_DOMAIN_SET).each(function(){N(this,b,c,d,e)})}function N(a,b,c,d,e){jQuery(a).children(ob.XML_GMLCOV_SIMPLE_MULTI_POINT).each(function(){var a=jQuery.trim(jQuery(this).attr(ob.XML_ATTR_SRS_DIMENSION));a&&(a=parseInt(a,10),a>0&&(b.gmlcovPositions.srsDimension=a,b.gmlcovPositions.timeIndex=a-1)),O(this,b.gmlcovPositions.contents,c,d,e)})}function O(a,b){jQuery(a).children(ob.XML_GMLCOV_POSITIONS).each(function(){var a=jQuery.trim(jQuery(this).text());a&&b.push.apply(b,a.split(ob.REGEX_WHITE_SPACE))})}function P(a,b,c,d,e){jQuery(a).children(ob.XML_GML_RANGE_SET).each(function(){Q(this,b,c,d,e)})}function Q(a,b,c,d,e){jQuery(a).children(ob.XML_GML_DATA_BLOCK).each(function(){R(this,b.data,c,d,e)})}function R(a,b){jQuery(a).children(ob.XML_GML_DOUBLE_OR_NIL_REASON_TUPLE_LIST).each(function(){var a=jQuery.trim(jQuery(this).text());a&&b.push.apply(b,a.split(ob.REGEX_WHITE_SPACE))})}function S(a,b){var c=!1;try{a&&jQuery(a).children(ob.XML_EXCEPTION_REPORT).each(function(){c=!0;var a={};b.push(a),T(this,a)})}catch(d){"undefined"!=typeof console&&console&&console.error("ERROR: Error while parsing exception data!");var e={};e[ob.KEY_ERROR_TEXT]=d.toString(),b.push(e)}return c}function T(a,b){jQuery(a).children(ob.XML_EXCEPTION).each(function(){b[ob.KEY_ERROR_CODE]=jQuery.trim(jQuery(this).attr(ob.XML_ATTR_EXCEPTION_CODE)),U(this,b)})}function U(a,b){jQuery(a).children(ob.XML_EXCEPTION_TEXT).each(function(){b[ob.KEY_ERROR_TEXT]=jQuery.trim(jQuery(this).text())})}function V(a,b,c,d,e){jQuery(a).children(ob.XML_COMPOSITE_OBSERVABLE_PROPERTY).each(function(){W(this,b,c,d,e)})}function W(a,b,c,d,e){jQuery(a).children(ob.XML_COMPONENT).each(function(){X(this,b,c,d,e)})}function X(b,c,d,e,f){jQuery(b).children(ob.XML_OBSERVABLE_PROPERTY).each(function(){var b=jQuery.trim(jQuery(this).attr(ob.XML_ATTR_GML_ID));if(b){var g=a();Y(this,g,d,e,f),Z(this,g,d,e,f),$(this,g,d,e,f),ab(this,g,d,e,f),c[b]=g}})}function Y(a,b){jQuery(a).children(ob.XML_LABEL).each(function(){b.label=jQuery.trim(jQuery(this).text())})}function Z(a,b){jQuery(a).children(ob.XML_BASE_PHENOMENON).each(function(){b.phenomenon=jQuery.trim(jQuery(this).text())})}function $(a,b){jQuery(a).children(ob.XML_UOM).each(function(){b.unit=jQuery.trim(jQuery(this).attr(ob.XML_ATTR_UOM))})}function ab(a,b,c,d,e){jQuery(a).children(ob.XML_STATISTICAL_MEASURE).each(function(){bb(this,b,c,d,e)})}function bb(a,b,c,d,e){jQuery(a).children(ob.XML_STATISTICAL_MEASURE_INNER).each(function(){cb(this,b,c,d,e),db(this,b,c,d,e)})}function cb(a,b){jQuery(a).children(ob.XML_STATISTICAL_FUNCTION).each(function(){b.statisticalFunction=jQuery.trim(jQuery(this).text())})}function db(a,b){jQuery(a).children(ob.XML_AGGREGATION_TIME_PERIOD).each(function(){b.statisticalPeriod=jQuery.trim(jQuery(this).text())})}function eb(a,b,c){try{a&&a(b,c)}catch(d){"undefined"!=typeof console&&console&&console.error("ERROR: Callback function error!")}}function fb(a,b,c){setTimeout(function(){jQuery.ajax({type:ob.HTTP_METHOD,url:a,dataType:ob.DATA_TYPE,success:function(a){eb(c,a,b)},error:function(a,d,e){var f={};f[ob.KEY_ERROR_CODE]=a.status,f[ob.KEY_ERROR_TEXT]=e||d,b.push(f),eb(c,void 0,b)}})},0)}function gb(a,b){var d=[];fb(a,d,function(a,d){c(a,d,b)})}function hb(a,b,c){if(a&&a.parameters&&b&&c)for(var d=0;d<a.parameters.length;++d){var e=a.parameters[d];if(e){for(var f={property:a.properties[e],timeValuePairs:[]},g=0;g<b.length;++g){var h=b[g];f.timeValuePairs.push({time:h.time,value:h.values[e]})}c[e]=f}}}function ib(a,b,c){var d;try{if(b&&b.parameters&&b.properties&&(d={info:b.info,properties:b.properties,locations:[]},b.locations&&b.locations.length>0))for(var e=b.locations,f=0;f<e.length;++f){var g=e[f],h={info:g.info,data:{}};hb(b,g.timeValuePairs,h.data),d.locations.push(h)}}catch(i){var j="ERROR: Could not finalize data!";"undefined"!=typeof console&&console&&console.error(j),d=void 0;var k={};k[ob.KEY_ERROR_TEXT]=i.toString(),c.push(k)}a(d,c)}function jb(a){var b="";if(a){for(var c in a)a.hasOwnProperty(c)&&(b+=fi.fmi.metoclient.metolib.Utils.encodeUriComponent(c),b+=ob.URL_QUERY_FIELD_VALUE_DELIMITER,b+=fi.fmi.metoclient.metolib.Utils.encodeUriComponent(a[c]||""));b&&(b=ob.URL_QUERY_PREFIX_AND+b)}return b}function kb(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){d instanceof Date||isNaN(d)||(d=new Date(d)),e instanceof Date||isNaN(e)||(e=new Date(e)),c&&_.isArray(c)&&(c=c.join()),(void 0===f||null===f)&&g&&g>0&&d instanceof Date&&e instanceof Date&&(f=Math.round((e.getTime()-d.getTime())/g));var q=a&&_.isString(a),r=b&&_.isString(b),s=c&&_.isString(c),t=d instanceof Date&&e instanceof Date&&d.getTime()<=e.getTime()&&(!f||_.isNumber(f)),u=_.isNumber(i)||i&&_.isString(i)||_.isArray(i)&&i.length,v=_.isNumber(j)||j&&_.isString(j)||_.isArray(j)&&j.length,w=_.isNumber(k)||k&&_.isString(k)||_.isArray(k)&&k.length,x=l&&_.isString(l)||_.isArray(l)&&l.length,y=m&&_.isString(m),z=u||v||w||x||y,A=!n||_.isString(n);if(!(q&&r&&s&&t&&z&&A)){var B="ERROR: Wrong or missing information for the request!";throw"undefined"!=typeof console&&console&&console.error(B),B}h||(d.setTime(lb(f,d).getTime()),e.setTime(mb(f,e,d).getTime()));var C=/\.\d+/;d=fi.fmi.metoclient.metolib.Utils.encodeUriComponent(d.toISOString()).split(C).join(""),e=fi.fmi.metoclient.metolib.Utils.encodeUriComponent(e.toISOString()).split(C).join("");var D="",E=Math.floor(f/ob.MIN_TO_MS);E&&E>0&&(D=ob.REQUEST_TIMESTEP+E),c=fi.fmi.metoclient.metolib.Utils.encodeUriComponent(c);var F,G="";if((_.isNumber(i)||i&&_.isString(i))&&(i=[i]),_.isArray(i))for(F=0;F<i.length;++F){var H=i[F];(_.isNumber(H)||H&&_.isString(H))&&(H=fi.fmi.metoclient.metolib.Utils.encodeUriComponent(H),G+=ob.REQUEST_GEOID+H)}var I="";if((_.isNumber(j)||j&&_.isString(j))&&(j=[j]),_.isArray(j))for(F=0;F<j.length;++F){var J=j[F];(_.isNumber(J)||J&&_.isString(J))&&(J=fi.fmi.metoclient.metolib.Utils.encodeUriComponent(J),I+=ob.REQUEST_WMO+J)}var K="";if((_.isNumber(k)||k&&_.isString(k))&&(k=[k]),_.isArray(k))for(F=0;F<k.length;++F){var L=k[F];(_.isNumber(L)||L&&_.isString(L))&&(L=fi.fmi.metoclient.metolib.Utils.encodeUriComponent(L),K+=ob.REQUEST_FMISID+L)}var M="";if(l)for(_.isString(l)&&(l=[l]),F=0;F<l.length;++F){var N=l[F];N&&_.isString(N)&&(N=fi.fmi.metoclient.metolib.Utils.encodeUriComponent(N),M+=ob.REQUEST_PLACE+N)}var O="";m&&(O=ob.REQUEST_BBOX+fi.fmi.metoclient.metolib.Utils.encodeUriComponent(m));var P="";n&&(P=ob.REQUEST_CRS+fi.fmi.metoclient.metolib.Utils.encodeUriComponent(n));var Q=ob.REQUEST_STORED_QUERY_ID+fi.fmi.metoclient.metolib.Utils.encodeUriComponent(b),R=-1===a.indexOf(ob.URL_QUERY_PREFIX_BEGIN)?ob.URL_QUERY_PREFIX_BEGIN:ob.URL_QUERY_PREFIX_AND;a.length>0&&(a.indexOf(ob.URL_QUERY_PREFIX_BEGIN)===a.length-1||a.indexOf(ob.URL_QUERY_PREFIX_AND)===a.length-1)&&(R="");var S=jb(o),T=a+R+ob.REQUEST_GET_FEATURE+Q+ob.REQUEST_PARAMETERS+c+ob.REQUEST_BEGIN+d+ob.REQUEST_END+e+D+G+I+K+M+O+P+S;gb(T,p)}function lb(a,b){var c;if(void 0!==b&&null!==b){c=new Date(b instanceof Date?b.getTime():b),c.setMilliseconds(0),c.setSeconds(0);var d=a?Math.floor(a/ob.MIN_TO_MS):void 0;if(d){var e=c.getMinutes();e-=e%d,c.setMinutes(e)}}return c}function mb(a,b,c){var d;if(void 0!==c&&null!==c&&void 0!==b&&null!==b){d=new Date(b instanceof Date?b.getTime():b);var e=lb(a,c);if(a){var f=(d.getTime()-e.getTime())%a;f>0&&d.setTime(d.getTime()+(a-f))}}return d}function nb(a){if(!a||!a.callback){var b="ERROR: Options object and callback function in it are mandatory!";throw"undefined"!=typeof console&&console&&console.error(b),b}try{kb(a.url,a.storedQueryId,a.requestParameter,a.begin,a.end,a.timestep,a.numOfTimesteps,a.denyTimeAdjusting,a.geoid,a.wmo,a.fmisid,a.sites,a.bbox,a.crs,a.queryExtension,function(b,c){ib(a.callback,b,c)})}catch(c){setTimeout(function(){"undefined"!=typeof console&&console&&console.error("ERROR: Get data error!");var b={};b[ob.KEY_ERROR_TEXT]=c.toString(),eb(a.callback,void 0,[b])},0)}}var ob={REGEX_WHITE_SPACE:/\s+/,EPOCH_TO_MS:1e3,MIN_TO_MS:6e4,HTTP_METHOD:"GET",DATA_TYPE:"xml",URL_QUERY_PREFIX_BEGIN:"?",URL_QUERY_PREFIX_AND:"&",URL_QUERY_FIELD_VALUE_DELIMITER:"=",REQUEST_GET_FEATURE:"request=getFeature",REQUEST_STORED_QUERY_ID:"&storedquery_id=",REQUEST_PARAMETERS:"&parameters=",REQUEST_BEGIN:"&starttime=",REQUEST_END:"&endtime=",REQUEST_TIMESTEP:"&timestep=",REQUEST_GEOID:"&geoid=",REQUEST_WMO:"&wmo=",REQUEST_FMISID:"&fmisid=",REQUEST_PLACE:"&place=",REQUEST_BBOX:"&bbox=",REQUEST_CRS:"&crs=",XML_WFS_FEATURE_COLLECTION:"wfs\\:FeatureCollection, FeatureCollection",XML_WFS_MEMBER:"wfs\\:member, member",XML_OMSO_POINT_TIME_SERIES_OBSERVATION:"omso\\:PointTimeSeriesObservation, PointTimeSeriesObservation",XML_OMSO_GRID_SERIES_OBSERVATION:"omso\\:GridSeriesObservation, GridSeriesObservation",XML_OM_PHENOMENON_TIME:"om\\:phenomenonTime, phenomenonTime",XML_GML_TIME_PERIOD:"gml\\:TimePeriod, TimePeriod",XML_GML_BEGIN_POSITION:"gml\\:beginPosition, beginPosition",XML_GML_END_POSITION:"gml\\:endPosition, endPosition",XML_OM_OBSERVED_PROPERTY:"om\\:observedProperty, observedProperty",XML_OM_FEATURE_OF_INTEREST:"om\\:featureOfInterest, featureOfInterest",XML_SAMS_SF_SPATIAL_SAMPLING_FEATURE:"sams\\:SF_SpatialSamplingFeature, SF_SpatialSamplingFeature",XML_SAM_SAMPLED_FEATURE:"sam\\:sampledFeature, sampledFeature",XML_TARGET_LOCATION_COLLECTION:"target\\:LocationCollection, LocationCollection",XML_TARGET_MEMBER:"target\\:member, member",XML_TARGET_LOCATION:"target\\:Location, Location",XML_GML_IDENTIFIER:"gml\\:identifier, identifier",XML_TARGET_REGION:"target\\:region, region",XML_TARGET_COUNTRY:"target\\:country, country",XML_TARGET_TIMEZONE:"target\\:timezone, timezone",XML_TARGET_REPRESENTATIVE_POINT:"target\\:representativePoint, representativePoint",XML_SAMS_SHAPE:"sams\\:shape, shape",XML_GML_MULTI_POINT:"gml\\:MultiPoint, MultiPoint",XML_GML_POINT_MEMBER:"gml\\:pointMember, pointMember",XML_GML_POINT_MEMBERS:"gml\\:pointMembers, pointMembers",XML_GML_POINT:"gml\\:Point, Point",XML_GML_NAME:"gml\\:name, name",XML_GML_POS:"gml\\:pos, pos",XML_OM_RESULT:"om\\:result, result",XML_GMLCOV_MULTI_POINT_COVERAGE:"gmlcov\\:MultiPointCoverage, MultiPointCoverage",XML_GML_DOMAIN_SET:"gml\\:domainSet, domainSet",XML_GMLCOV_SIMPLE_MULTI_POINT:"gmlcov\\:SimpleMultiPoint, SimpleMultiPoint",XML_GMLCOV_POSITIONS:"gmlcov\\:positions, positions",XML_GML_RANGE_SET:"gml\\:rangeSet, rangeSet",XML_GML_DATA_BLOCK:"gml\\:DataBlock, DataBlock",XML_GML_DOUBLE_OR_NIL_REASON_TUPLE_LIST:"gml\\:doubleOrNilReasonTupleList, doubleOrNilReasonTupleList",XML_GMLCOV_RANGE_TYPE:"gmlcov\\:rangeType, rangeType",XML_SWE_DATA_RECORD:"swe\\:DataRecord, DataRecord",XML_SWE_FIELD:"swe\\:field, field",XML_COMPOSITE_OBSERVABLE_PROPERTY:"CompositeObservableProperty",XML_COMPONENT:"component",XML_OBSERVABLE_PROPERTY:"ObservableProperty",XML_LABEL:"label",XML_BASE_PHENOMENON:"basePhenomenon",XML_UOM:"uom",XML_STATISTICAL_MEASURE:"statisticalMeasure",XML_STATISTICAL_MEASURE_INNER:"StatisticalMeasure",XML_STATISTICAL_FUNCTION:"statisticalFunction",XML_AGGREGATION_TIME_PERIOD:"aggregationTimePeriod",XML_ATTR_NAME:"name",XML_ATTR_SRS_DIMENSION:"srsDimension",XML_ATTR_XLINK_HREF:"xlink:href",XML_ATTR_GML_ID:"gml:id",XML_ATTR_CODE_SPACE:"codeSpace",XML_ATTR_CODE_SPACE_NAME:"http://xml.fmi.fi/namespace/locationcode/name",XML_ATTR_CODE_SPACE_WMO:"http://xml.fmi.fi/namespace/locationcode/wmo",XML_ATTR_CODE_SPACE_GEOID:"http://xml.fmi.fi/namespace/locationcode/geoid",XML_ATTR_CODE_SPACE_FMISID:"http://xml.fmi.fi/namespace/stationcode/fmisid",XML_ATTR_UOM:"uom",XML_REF_PREFIX:"#",XML_EXCEPTION_REPORT:"ExceptionReport",XML_EXCEPTION:"Exception",XML_ATTR_EXCEPTION_CODE:"exceptionCode",XML_EXCEPTION_TEXT:"ExceptionText",KEY_ERROR_CODE:"errorCode",KEY_ERROR_TEXT:"errorText"};return{getData:nb,adjustBeginTime:lb,adjustEndTime:mb}}();