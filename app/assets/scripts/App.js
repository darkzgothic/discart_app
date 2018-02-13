import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import MobileMenu from './modules/MobileMenu';
import Helper from './modules/Helper';
import GoogleMapHelper from './modules/GoogleMapHelper';
import $ from 'jquery';

new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".feedback"), "85%");
var stickyHeader = new StickyHeader;
var mobileMenu = new MobileMenu;
var helper = new Helper;
var googleMapHelper = new GoogleMapHelper;