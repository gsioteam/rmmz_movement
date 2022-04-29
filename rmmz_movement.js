//=============================================================================
// This RPG Maker Plugin is generated by rmmzp
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0.2) 8 direction movement and pixel movement for RPG Maker MZ.
 * @author gsioteam
 */
!function(){return function t(e,s,i){function r(n,h){if(!s[n]){if(!e[n]){var a="function"==typeof require&&require;if(!h&&a)return a(n,!0);if(o)return o(n,!0);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}var u=s[n]={exports:{}};e[n][0].call(u.exports,function(t){return r(e[n][1][t]||t)},u,u.exports,t,e,s,i)}return s[n].exports}for(var o="function"==typeof require&&require,n=0;n<i.length;n++)r(i[n]);return r}}()({1:[function(t,e,s){const{Game_Player:i,Input:r,Game_CharacterBase:o}=t("rmmz"),n=o.prototype.isMoving;o.prototype.isMoving=function(){return!!this._movePressing||n.call(this)},i.prototype.moveByInput=function(){if((!this.isMoving()||this._movePressing)&&this.canMove()){let t=r.dir8;if(t>0)return $gameTemp.clearDestination(),this.setMovementSuccess(!1),(t=this._moveByInput(t))>0&&this.setDirection(t),void(this.isMovementSucceeded()?(this._followersMove(0),this._movePressing=!0):(this._followersMove(2),this._movePressing=!1,this.checkEventTriggerTouchFront(t)));if($gameTemp.isDestinationValid()){this._x=Math.round(this._x),this._y=Math.round(this._y);const e=$gameTemp.destinationX(),s=$gameTemp.destinationY();return(t=this.findDirectionTo(e,s))>0&&this.executeMove(t),void this._followersMove(1)}}this._followersMove(2),this._movePressing=!1},i.prototype._moveByInput=function(t){let e=Math.round(this._x),s=Math.round(this._y),i=this.distancePerFrame(),r=(t=0)=>this.canPass(e+t,Math.floor(this._y+i),2),o=(t=0)=>this.canPass(e+t,Math.ceil(this._y-i),8),n=(t=0)=>this.canPass(Math.ceil(this._x-i),s+t,4),h=(t=0)=>this.canPass(Math.floor(this._x+i),s+t,6);switch(t){case 1:{let i=n(),o=r();if(i&&o){if(n(1)){this.setMovementSuccess(!0);let t=this.distancePerFrame()/Math.SQRT2;return this._y+=t,this._x-=t,(Math.round(this._y)>s||Math.round(this._x)<e)&&this.increaseSteps(),2}return this.x-e<s-this.y?this._moveByInput(4):this._moveByInput(2)}if(i)return this._moveByInput(4);if(o)return this._moveByInput(2);t=2;break}case 3:{let i=h(),o=r();if(i&&o){if(h(1)){this.setMovementSuccess(!0);let t=this.distancePerFrame()/Math.SQRT2;return this._y+=t,this._x+=t,(Math.round(this._y)>s||Math.round(this._x)>e)&&this.increaseSteps(),2}return e-this.x<s-this.y?this._moveByInput(6):this._moveByInput(2)}if(i)return this._moveByInput(6);if(o)return this._moveByInput(2);t=2;break}case 7:{let i=n(),r=o();if(i&&r){if(n(-1)){this.setMovementSuccess(!0);let t=this.distancePerFrame()/Math.SQRT2;return this._y-=t,this._x-=t,(Math.round(this._y)<s||Math.round(this._x)<e)&&this.increaseSteps(),8}return this.x-e<this.y-s?this._moveByInput(4):this._moveByInput(8)}if(i)return this._moveByInput(4);if(r)return this._moveByInput(8);t=8;break}case 9:{let i=h(),r=o();if(i&&r){if(h(-1)){this.setMovementSuccess(!0);let t=this.distancePerFrame()/Math.SQRT2;return this._y-=t,this._x+=t,(Math.round(this._y)<s||Math.round(this._x)>e)&&this.increaseSteps(),8}return e-this.x<this.y-s?this._moveByInput(6):this._moveByInput(8)}if(i)return this._moveByInput(6);if(r)return this._moveByInput(8);t=8;break}case 2:if(r())return this.setMovementSuccess(!0),this._y+=this.distancePerFrame(),Math.round(this._y)>s&&this.increaseSteps(),(this._x>e&&!r(1)||this._x<e&&!r(-1))&&(this._x=e),t;break;case 8:if(o())return this.setMovementSuccess(!0),this._y-=this.distancePerFrame(),Math.round(this._y)<s&&this.increaseSteps(),(this._x>e&&!o(1)||this._x<e&&!o(-1))&&(this._x=e),t;break;case 4:if(n())return this.setMovementSuccess(!0),this._x-=this.distancePerFrame(),Math.round(this._x)<e&&this.increaseSteps(),(this._y>s&&!n(1)||this._y<s&&!n(-1))&&(this._y=s),t;break;case 6:if(h())return this.setMovementSuccess(!0),this._x+=this.distancePerFrame(),Math.round(this._x)>e&&this.increaseSteps(),(this._y>s&&!h(1)||this._y<s&&!h(-1))&&(this._y=s),t}return t},i.prototype._followersMove=function(t){this._recordPosition();var e=this._followers._data;if(0===t)for(let t=e.length-1;t>=0;t--){let s=(t>0?e[t-1]:$gamePlayer)._lastPosition();if(s){let i=e[t];s.y>i._y?i.setDirection(2):s.y<i._y?i.setDirection(8):s.x>i._x?i.setDirection(6):s.x<i._x&&i.setDirection(4),i._x=s.x,i._y=s.y,i._movePressing=!0,i._recordPosition()}}else for(let s of e)1===t&&(s._x=Math.round(s.x),s._y=Math.round(s.y)),s._movePressing=!1,s._recordPosition()},o.prototype._recordPosition=function(){this._posRecords||(this._posRecords=[]);let t=this._lastPosition();if(!t||function(t,e){let s=t.x-e.x,i=t.y-e.y;return Math.sqrt(s*s+i*i)}(t,this)>.1)for(this._posRecords.push({x:this.x,y:this.y});this._posRecords.length>14;)this._posRecords.shift()},o.prototype._lastPosition=function(){if(this._posRecords&&this._posRecords.length>0)return this._posRecords[0]},i.prototype.checkEventTriggerHere=function(t){this.canStartLocalEvents()&&this.startMapEvent(Math.round(this.x),Math.round(this.y),t,!1)};const h=i.prototype.checkEventTriggerThere;i.prototype.checkEventTriggerThere=function(){this._x=Math.round(this.x),this._y=Math.round(this.y),h.call(this,...arguments)};const a=i.prototype.checkEventTriggerTouch;i.prototype.checkEventTriggerTouch=function(t,e){let s=Math.round(t),i=Math.round(e);return Math.abs(s-t)<.3&&Math.abs(i-e)<.3&&a.call(this,s,i)};const c=Game_Character.prototype.processMoveCommand;Game_Character.prototype.processMoveCommand=function(){return this._movePressing=!1,this._x=Math.round(this.x),this._y=Math.round(this.y),c.call(this,...arguments)}},{rmmz:2}],2:[function(t,e,s){e.exports=window},{}]},{},[1]);