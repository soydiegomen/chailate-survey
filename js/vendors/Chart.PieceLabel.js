/**
 * [Chart.PieceLabel.js]{@link https://github.com/emn178/Chart.PieceLabel.js}
 *
 * @version 0.2.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2017
 * @license MIT
 */
(function(){Chart.pluginService.register({afterDraw:function(c){if(c.options.pieceLabel){var e=c.chart.ctx,l=c.config.options,w=c.options.pieceLabel.arcText||!1,r=c.options.pieceLabel.format,x=c.options.pieceLabel.precision||0,m=c.options.pieceLabel.fontSize||l.defaultFontSize,y=c.options.pieceLabel.fontColor||"#fff",z=c.options.pieceLabel.fontStyle||l.defaultFontStyle,A=c.options.pieceLabel.fontFamily||l.defaultFontFamily,t=c.tooltip._active&&c.tooltip._active.length;c.config.data.datasets.forEach(function(p,
B){for(var u=p._meta[Object.keys(p._meta)[0]],q=0,k=0;k<u.data.length;k++){var a=u.data[k],d=a._view;t&&a.draw();var b;switch(c.options.pieceLabel.mode){case "value":b=p.data[k];r&&(b=r(b));b=b.toString();break;case "label":b=c.config.data.labels[k];break;default:b=d.circumference/l.circumference*100,b=parseFloat(b.toFixed(x)),q+=b,100<q&&(b-=q-100),b+="%"}e.save();e.beginPath();e.font=Chart.helpers.fontString(m,z,A);var f=e.measureText(b),g=a.tooltipPosition(),h=g.x-f.width/2,f=g.x+f.width/2,n=g.y-
m/2,v=g.y+m/2;if(a.inRange(h,n)&&a.inRange(h,v)&&a.inRange(f,n)&&a.inRange(f,v))if(e.fillStyle=y,w){e.textBaseline="middle";a=e;f=d.x;n=d.y;g=(d.innerRadius+d.outerRadius)/2;h=d.startAngle;d=d.endAngle;a.save();a.translate(f,n);h+=Math.PI/2;d+=Math.PI/2;f=a.measureText(b);h+=(d-(f.width/g+h))/2;a.rotate(h);for(d=0;d<b.length;d++)h=b.charAt(d),f=a.measureText(h),a.save(),a.translate(0,-1*g),a.fillText(h,0,0),a.restore(),a.rotate(f.width/g);a.restore()}else e.textBaseline="top",e.textAlign="center",
e.fillText(b,g.x,g.y-m/2);e.restore()}});t&&c.tooltip.draw()}}})})();