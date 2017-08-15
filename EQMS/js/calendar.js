function mCalendar(id, selectChange, changeMonth){
	this.parentId = id;
	this.sev_m = 0;
	this.sev_y = 0;
	this.sev_d = 0;
	this.active = 3;
	this.selectChange = selectChange;
	this.changeMonth = changeMonth;
	this.yl = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var _this = this;
	
	//创建标签
	var _cal = $('<section class="out-wrap">'+
			'<section class="content">'+
				'<section class="week">'+
					'<ul class="clearfix f28">'+
						'<li>'+
							'<a href="#">日</a>'+
						'</li>'+
						'<li>'+
							'<a href="#">一</a>'+
						'</li>'+
						'<li>'+
							'<a href="#">二</a>'+
						'</li>'+
						'<li>'+
							'<a href="#">三</a>'+
						'</li>'+
						'<li>'+
							'<a href="#">四</a>'+
						'</li>'+
						'<li>'+
							'<a href="#">五</a>'+
						'</li>'+
						'<li>'+
							'<a href="#">六</a>'+
						'</li>'+
					'</ul>'+
				'</section>'+
				'<section class="calenda">'+
					'<div class="swiper-container">'+
						'<div class="swiper-wrapper">'+
							'<div class="swiper-slide">'+
								'<table id="now1" class="tables">'+
									'<tr class="">'+
										'<td class=" list"><i>12</i><em>中秋</em></td>'+
									'</tr>'+
								'</table>'+
							'</div>'+
							'<div class="swiper-slide">'+
								'<table id="now2" class="tables">'+
									'<tr class="">'+
										'<td class=" list"><i>12</i><em>中秋</em></td>'+
									'</tr>'+
								'</table>'+
							'</div>'+
							'<div class="swiper-slide">'+
								'<table id="now3" class="tables">'+
									'<tr class="">'+
										'<td class="list"><i>12</i><em>中秋</em></td>'+
									'</tr>'+
								'</table>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</section>'+
			'</section>'+
		'</section>');
	$('#'+id).append(_cal);
	
	this.mySwiper = new Swiper('.swiper-container', {
		initialSlide: 1,
		loop: true,
		speed: 400,
		followFinger: false,
		prevButton: '.js_prev',
		nextButton: '.js_next',
		onSlideChangeStart: function(swiper) {
			swiper.lockSwipes();
		},
		onSlideChangeEnd: function(swiper) {
//			console.log("change.......");
			var nows = $(".swiper-slide-active").find("table").attr("id");
			if(nows == 'now2')
				return;
			nows = parseInt(nows.substr(1, 1));
			//console.log(active,nows);
			if(nows == _this.active)
				return;
			if(_this.active == 4 && nows == 5) {
				var fors = 1;

				_this.sev_m++;
				if(_this.sev_m > 12) {
					_this.sev_m = 1;
					_this.sev_y++;
				}
				var nowweak = new Date(_this.sev_y, _this.sev_m - 1, 1).getDay();
				_this.get_first(nowweak, _this.sev_y, _this.sev_m, 0, "d2");

				var lastm = _this.sev_m - 1;
				var lasty = _this.sev_y;
				if(lastm < 1) {
					lastm = 12;
					lasty--;
				}

				var nm = _this.sev_m + 1;
				var ny = _this.sev_y;
				if(nm > 12) {
					nm = 1;
					ny++;
				}
				var nowweak = new Date(ny, nm - 1, 1).getDay();
				var lastweek = new Date(lasty, lastm - 1, 1).getDay();
				_this.get_first(lastweek, lasty, lastm, 0, "d" + fors);
				_this.get_first(nowweak, ny, nm, 0, "d3");
				_this.changeMonth(_this.sev_y + "-" + _this.monthFormat(_this.sev_m))
				_this.active = 5;
			} else if(_this.active == 2 && nows == 1) {
				var fors = 5;

				var nextweak = new Date(_this.sev_y, _this.sev_m - 1, 1).getDay();
				_this.get_first(nextweak, _this.sev_y, _this.sev_m, 0, "d" + fors);
				_this.sev_m--;
				if(_this.sev_m < 1) {
					_this.sev_m = 12;
					_this.sev_y--;
				}
				var nowweak = new Date(_this.sev_y, _this.sev_m - 1, 1).getDay();
				_this.get_first(nowweak, _this.sev_y, _this.sev_m, 0, "d4");

				var nm = _this.sev_m - 1;
				var ny = _this.sev_y;
				if(nm < 1) {
					nm = 12;
					ny--;
				}
				var nowweak = new Date(ny, nm - 1, 1).getDay();
				
				_this.get_first(nowweak, ny, nm, 0, "d3");
				_this.changeMonth(_this.sev_y + "-" + _this.monthFormat(_this.sev_m))
				_this.active = 1;
			} else if(_this.active == 5 && nows == 3) {
				var fors = 4;

				var lastm = _this.sev_m;
				var lasty = _this.sev_y;

				_this.sev_m++;
				if(_this.sev_m > 12) {
					_this.sev_m = 1;
					_this.sev_y++;
				}

				var nm = _this.sev_m + 1;
				var ny = _this.sev_y;
				if(nm > 12) {
					nm = 1;
					ny++;
				}
				var nowweak = new Date(ny, nm - 1, 1).getDay();
				_this.get_first(nowweak, ny, nm, 0, "d" + fors);
				var nowweak = new Date(lasty, lastm - 1, 1).getDay();
				_this.get_first(nowweak, lasty, lastm, 0, "d2");
				_this.changeMonth(_this.sev_y + "-" + _this.monthFormat(_this.sev_m))
				_this.active = 3;
			} else if(_this.active == 1 && nows == 3) {
				var fors = 2;

				var lastm = _this.sev_m;
				var lasty = _this.sev_y;

				_this.sev_m--;
				if(_this.sev_m < 1) {
					_this.sev_m = 12;
					_this.sev_y--;
				}

				var nm = _this.sev_m - 1;
				var ny = _this.sev_y;
				if(nm < 1) {
					nm = 12;
					ny--;
				}
				var nowweak = new Date(ny, nm - 1, 1).getDay();
				_this.get_first(nowweak, ny, nm, 0, "d" + fors);
				var nowweak = new Date(lasty, lastm - 1, 1).getDay();
				_this.get_first(nowweak, lasty, lastm, 0, "d4");
				_this.changeMonth(_this.sev_y + "-" + _this.monthFormat(_this.sev_m))
				_this.active = 3;
			} else if(_this.active == 1 && nows == 5) {
				var fors = 3;

				var lastm = _this.sev_m;
				var lasty = _this.sev_y;

				_this.sev_m++;
				if(_this.sev_m > 12) {
					_this.sev_m = 1;
					_this.sev_y++;
				}

				var nm = _this.sev_m + 1;
				var ny = _this.sev_y;
				if(nm > 12) {
					nm = 1;
					ny++;
				}
				var nowweak = new Date(ny, nm - 1, 1).getDay();
				_this.get_first(nowweak, ny, nm, 0, "d" + fors);
				_this.changeMonth(_this.sev_y + "-" + _this.monthFormat(_this.sev_m))
				_this.active = 5;
			} else if(_this.active == 5 && nows == 1) {
				var fors = 3;

				_this.sev_m--;
				if(_this.sev_m < 1) {
					_this.sev_m = 12;
					_this.sev_y--;
				}
				var lastm = _this.sev_m;
				var lasty = _this.sev_y;

				var nm = _this.sev_m - 1;
				var ny = _this.sev_y;
				if(nm < 1) {
					nm = 12;
					ny--;
				}
				var nowweak = new Date(ny, nm - 1, 1).getDay();
				var lastweak = new Date(lasty, _this.sev_m - 1, 1).getDay();
				_this.get_first(nowweak, ny, nm, 0, "d" + fors);
//				console.log(lasty, lastm)
				_this.get_first(lastweak, lasty, _this.sev_m, 0, "d4");
				_this.changeMonth(_this.sev_y + "-" + _this.monthFormat(_this.sev_m))
				_this.active = 1;
			} else if(_this.active > nows) {
				var fors = nows - 1;
				if(fors < 1)
					fors = 5;

				_this.sev_m--;
				if(_this.sev_m < 1) {
					_this.sev_m = 12;
					_this.sev_y--;
				}

				var nm = _this.sev_m - 1;
				var ny = _this.sev_y;
				if(nm < 1) {
					nm = 12;
					ny--;
				}
				var nowweak = new Date(ny, nm - 1, 1).getDay();
				_this.get_first(nowweak, ny, nm, 0, "d" + fors);
				_this.changeMonth(_this.sev_y + "-" + _this.monthFormat(_this.sev_m))
				_this.active = nows;
			} else if(_this.active < nows) {
				var fors = nows + 1;
				if(fors > 5)
					fors = 1;

				_this.sev_m++;
				if(_this.sev_m > 12) {
					_this.sev_m = 1;
					_this.sev_y++;
				}

				var nm = _this.sev_m + 1;
				var ny = _this.sev_y;
				if(nm > 12) {
					nm = 1;
					ny++;
				}
				var nowweak = new Date(ny, nm - 1, 1).getDay();
				_this.get_first(nowweak, ny, nm, 0, "d" + fors);
				_this.changeMonth(_this.sev_y + "-" + _this.monthFormat(_this.sev_m))
				_this.active = nows;
			}
			var trLength = $("#d" + nows).find("tr").length;
			if(trLength == 6) {
				$(".swiper-container").css("paddingBottom", ".45rem");
			} else {
				$(".swiper-container").css("paddingBottom", "");

			}
			swiper.unlockSwipes();
		}
	})
	
	this.LunarDate = {
		madd: new Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334),
		HsString: '甲乙丙丁戊己庚辛壬癸',
		EbString: '子丑寅卯辰巳午未申酉戌亥',
		NumString: "一二三四五六七八九十",
		MonString: "正二三四五六七八九十冬腊",
		CalendarData: new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95),
		Year: null,
		Month: null,
		Day: null,
		TheDate: null,
		GetBit: function(m, n) {
			return(m >> n) & 1;
		},
		e2c: function() {
			this.TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
			var total, m, n, k;
			var isEnd = false;
			var tmp = this.TheDate.getFullYear();
			total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + this.madd[this.TheDate.getMonth()] + this.TheDate.getDate() - 38;
			if(this.TheDate.getYear() % 4 == 0 && this.TheDate.getMonth() > 1) {
				total++;
			}
			for(m = 0;; m++) {
				k = (this.CalendarData[m] < 0xfff) ? 11 : 12;
				for(n = k; n >= 0; n--) {
					if(total <= 29 + this.GetBit(this.CalendarData[m], n)) {
						isEnd = true;
						break;
					}
					total = total - 29 - this.GetBit(this.CalendarData[m], n);
				}
				if(isEnd)
					break;
			}
			this.Year = 1921 + m;
			this.Month = k - n + 1;
			this.Day = total;
			if(k == 12) {
				if(this.Month == Math.floor(this.CalendarData[m] / 0x10000) + 1) {
					this.Month = 1 - this.Month;
				}
				if(this.Month > Math.floor(this.CalendarData[m] / 0x10000) + 1) {
					this.Month--;
				}
			}
		},
		GetcDateString: function(tip) {
			if(tip == 1) {
				var ts = (this.Day < 11) ? "初" : ((this.Day < 20) ? "十" : ((this.Day < 30) ? "廿" : "三十"));
				if(this.Day % 10 != 0 || this.Day == 10) {
					ts += this.NumString.charAt((this.Day - 1) % 10);
				}
				return ts;
			}
			var tmp = "";
			// tmp += this.HsString.charAt((this.Year - 4) % 10);  
			// tmp += this.EbString.charAt((this.Year - 4) % 12);  
			// tmp += "年 ";  
			if(this.Month < 1) {
				//tmp += "(闰)";  
				tmp += this.MonString.charAt(-this.Month - 1);
			} else {
				tmp += this.MonString.charAt(this.Month - 1);
			}
			tmp += "月";
			tmp += (this.Day < 11) ? "初" : ((this.Day < 20) ? "十" : ((this.Day < 30) ? "廿" : "三十"));
			if(this.Day % 10 != 0 || this.Day == 10) {
				tmp += this.NumString.charAt((this.Day - 1) % 10);
			}
			return tmp;
		},
		GetLunarDay: function(solarYear, solarMonth, solarDay) {
			if(solarYear < 1921 || solarYear > 2020) {
				return "";
			} else {
				solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
				this.e2c(solarYear, solarMonth, solarDay);
				return this.GetcDateString(0);
			}
		},
		GetLunarDayDetail: function(solarYear, solarMonth, solarDay) {
			if(solarYear < 1921 || solarYear > 2020) {
				return "";
			} else {
				solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
				this.e2c(solarYear, solarMonth, solarDay);
				return this.GetcDateString(1);
			}
		}
	};
}

mCalendar.prototype.init = function(){
	$("#now3").attr("id", "d1");
	$("#now1").attr("id", "d2");
	$("#now2").attr("id", "d3");
	$("#now3").attr("id", "d4");
	$("#now1").attr("id", "d5");
	var globledate = new Date();
	var y = globledate.getFullYear();
	var m = globledate.getMonth() + 1;
	var d = globledate.getDate();
	this.sev_m = m;
	this.sev_y = y;
	this.sev_d = d;
	var nowweak = new Date(y, m - 1, 1).getDay();
	if(nowweak == 7) nowweak = 0;
	this.get_first(nowweak, y, m, d, "d3");
	this.set_top(0);

	m = m + 1;
	if(m > 12) {
		m = 1;
		y += 1;
	}
	nowweak = new Date(y, m - 1, 1).getDay();
	this.get_first(nowweak, y, m, 0, "d4");

	m = this.sev_m - 1;
	if(m < 1) {
		m = 12;
		y = this.sev_y - 1;
	}
	nowweak = new Date(y, m - 1, 1).getDay();
	this.get_first(nowweak, y, m, 0, "d2");

//	$("#ymym").html(this.sev_y + "年" + this.sev_m + "月");
	this.changeMonth(this.sev_y + "-" + this.monthFormat(this.sev_m))
	
	this.mySwiper.unlockSwipes();
}

mCalendar.prototype.jump = function (yyyy, mm, dd) {
//	console.log("============jump=============");
	this.sev_y = parseInt(yyyy);
	this.sev_m = parseInt(mm);
	this.sev_d = parseInt(dd);

	this.active = 3;
	var globledate = new Date(yyyy, parseInt(mm) - 1, parseInt(dd));
	//var nowweak = globledate.getDay();
	var y = globledate.getFullYear();
	var m = globledate.getMonth() + 1;
	var d = globledate.getDate();
	//console.log("globledate:",y,m,d);

	var sev_m_tmp = m;
	var sev_y_tmp = y;
	var sev_d_tmp = d;
	var nowweak = new Date(y, m - 1, 1).getDay();
	if(nowweak == 7) nowweak = 0;
	this.get_first(nowweak, y, m, d, "d3");
	//set_top(0);

	m = m + 1;
	if(m > 12) {
		m = 1;
		y += 1;
	}
	nowweak = new Date(y, m - 1, 1).getDay();
	this.get_first(nowweak, y, m, 0, "d4");

	m = this.sev_m - 1;
	if(m < 1) {
		m = 12;
		y = this.sev_y - 1;
	}
	nowweak = new Date(y, m - 1, 1).getDay();
	this.get_first(nowweak, y, m, 0, "d2");
	this.changeMonth(this.sev_y + "-" + this.monthFormat(this.sev_m))
//	$("#ymym").html(this.sev_y + "年" + this.sev_m + "月");
	$(".covers").hide();
	this.mySwiper.slideTo(2, 500, false);
	this.click_sev();

}

mCalendar.prototype.click_sev = function(){
	$("#d3").find("td").each(function() {
		if($(this).attr("data_y") == this.sev_y && $(this).attr("data_m") == this.sev_m && $(this).attr("data_d") == this.sev_d) {
			$(this).click();
		}
	});
}

mCalendar.prototype.get_first = function (a, b, c, d, e) {
//	console.log("============get_first=============");
	var str = '<tr>';
	if((c - 2) < 0) {
		var ldays = 31;
		var lm = 12;
		var lb = b - 1;
	} else {
		var ldays = this.yl[c - 2];
		var lm = c - 1;
		var lb = b;
	}

	if(c == 12) {
		var xdays = 31;
		var xm = 1;
		var xb = b + 1;
	} else {
		var xdays = this.yl[c];
		var xm = c + 1;
		var xb = b;
	}

	if(ldays == 28) {
		if((lb % 4 == 0 && lb % 100 != 0) || (lb % 100 == 0 && lb % 400 == 0)) {
			ldays = 29;
		}
	}

	if(xdays == 28) {
		if((xb % 4 == 0 && xb % 100 != 0) || (xb % 100 == 0 && xb % 400 == 0)) {
			xdays = 29;
		}
	}
	var dd;
	if(this.yl[c - 1] == 28) {
		if((b % 4 == 0 && b % 100 != 0) || (b % 100 == 0 && b % 400 == 0)) {
			dd = 29;
		} else {
			dd = 28;
		}
	} else {
		dd = this.yl[c - 1];
	}

	var num = 1;

	for(var i = a; i > 0; i--) {
		var bday = ldays - i + 1;
		var ly = this.LunarDate.GetLunarDayDetail(lb, lm, bday);
		var jq = this.getjq(lb, lm, bday);
		if(jq) {
			ly = '<font color="#00b7ec">' + jq;
		}
		var jd = "";
		var hb = lb + "-" + lm + "-" + bday;
		// if (fj.indexOf(hb) >= 0) {
		//     jd = "<span class='fangjia'></span>";
		// }
		// if (sb.indexOf(hb) >= 0) {
		//     jd = "<span class='shangban'></span>";
		// }
		// if (gj.indexOf(hb) >= 0) {
		//     ly = '<font color="#00b7ec">' + gjs[gj.indexOf(hb)];
		// }
		str += ' <td data_y="' + lb + '" data_m="' + lm + '" data_d="' + bday + '" class="list not_this js_up"></td>';
		if(num % 7 == 0) {
			str += '</tr><tr>';
		}
		num++;
	}

	for(var i = 1; i <= dd; i++) {
		var bday = ldays - i + 1;
		var ly = this.LunarDate.GetLunarDayDetail(b, c, i);
		var jq = this.getjq(b, c, i);
		if(jq) {
			ly = '<font color="#00b7ec">' + jq;
		}
		var jd = "";
		var hb = b + "-" + c + "-" + i;
		
		if(new Date().getDate() == i && b == new Date().getFullYear() && c == (new Date().getMonth() + 1)) {
			str += ' <td data_y="' + b + '" data_m="' + c + '" data_d="' + i + '" class="list today"><i>' + i + '</i><em>' + ly + '</em>' + jd + '</td>';
		} else {
			str += ' <td data_y="' + b + '" data_m="' + c + '" data_d="' + i + '" class="list"><i>' + i + '</i><em>' + ly + '</em>' + jd + '</td>';
		}

		if(num % 7 == 0) {
			str += '</tr><tr>';
		}
		num++;
	}

	var last = 42 - a - dd;
	if(last <= 6) {

		for(var i = 1; i <= last; i++) {
			var ly = this.LunarDate.GetLunarDayDetail(xb, xm, i);
			var jq = this.getjq(xb, xm, i);
			if(jq) {
				ly = '<font color="#00b7ec">' + jq;
			}
			var jd = "";
			var hb = xb + "-" + xm + "-" + i;
			str += ' <td data_y="' + xb + '" data_m="' + xm + '" data_d="' + i + '" class="list not_this js_down"></td>';
			if(num % 7 == 0) {
				str += '</tr><tr>';
			}
			num++;
		}
	}
	if(str.substring(str.length - 4, str.length) == "<tr>") {
		str = str.substring(0, str.length - 4);
	}
	document.getElementById(e).innerHTML = str;
	this.bind_click(e);
}

mCalendar.prototype.bind_click = function (a) {
	var _this = this;
//	console.log("============bind_click=============");
	$("#" + a).find("td").unbind("click");
	$("#" + a).find("td").each(function() {
		if($(this).hasClass('not_this')) {
//			$(this).click(function() {
//				_this.jump($(this).attr('data_y'), $(this).attr('data_m'), $(this).attr('data_d'));
//			});
		} else {
			$(this).click(function() {
				_this.set_top($(this));
			});
		}
	});
}

mCalendar.prototype.set_top = function (a) {
//	console.log("=============set_top==============");
	if(!a) {
		var data = new Date();
		
		var shu = data.getDate();
		this.sev_d = parseInt(shu);
		this.selectChange('')
	} else {
		var y = a.attr("data_y");
		var m = parseInt(a.attr("data_m"));
		var d = parseInt(a.attr("data_d"));
		this.sev_d = parseInt(d);
		$(".xuanzhong").removeClass('xuanzhong');
		a.addClass("xuanzhong");
		this.selectChange(y+"-"+m+'-'+d)
	}
}

mCalendar.prototype.getjq = function (yyyy, mm, dd) {
//	console.log("=============getjq==============");
	if(yyyy == 2016 && mm == 12 && dd == 7) {
		return "大雪";
	}
	if(yyyy == 2016 && mm == 12 && dd == 6) {
		return "";
	}
	mm = mm - 1;
	var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
	var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
	var tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
	var tmp2 = tmp1.getUTCDate();
	var solarTerms = "";
	if(tmp2 == dd)
		solarTerms = solarTerm[mm * 2 + 1];
	tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
	tmp2 = tmp1.getUTCDate();
	if(tmp2 == dd)
		solarTerms = solarTerm[mm * 2];
	return solarTerms;
}


mCalendar.prototype.setCalDate = function(date){
	var _this = this;
	_this.active = 3;
	var globledate = date;
	var y = globledate.getFullYear();
	var m = globledate.getMonth() + 1;
	var d = globledate.getDate();
	_this.sev_m = m;
	_this.sev_y = y;
	_this.sev_d = d;
	var nowweak = new Date(y, m - 1, 1).getDay();
	if(nowweak == 7) nowweak = 0;
	_this.get_first(nowweak, y, m, d, "d3");
	_this.set_top(0);

	m = m + 1;
	if(m > 12) {
		m = 1;
		y += 1;
	}
	nowweak = new Date(y, m - 1, 1).getDay();
	_this.get_first(nowweak, y, m, 0, "d4");

	m = _this.sev_m - 1;
	if(m < 1) {
		m = 12;
		y = _this.sev_y - 1;
	}
	nowweak = new Date(y, m - 1, 1).getDay();
	_this.get_first(nowweak, y, m, 0, "d2");

	$("#ymym").html(_this.sev_y + "年" + _this.sev_m + "月");
	_this.changeMonth(_this.sev_y + "-" + _this.monthFormat(_this.sev_m))
	_this.mySwiper.slideTo(2, 500, false);
}

mCalendar.prototype.monthFormat = function(d){
	return (d > 9 ? d : '0'+d)
}