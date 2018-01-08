let forEach = Array.prototype.forEach

const buttons = []
const times = Array(8).fill(null)
let buttonPos = Array(8).fill({ x: 0, y: 0 })
const publicPos = {}

const buttonEles = $('.button')
const dealy = 20
const firstButton = buttonEles.last()
let touchTag = false
let timer = null

forEach.call(buttonEles, item => {
  buttons.push(item)
})

firstButton.on('touchstart', e => {
  touchTag = true
  timer = setInterval(interValSetPos, 50)
})

// 同一个元素只能有一个超时 否则会造成太快速的clear
$('html').on('touchmove', e => {
  // if (!touchTag) {
  //   return
  // }
  // clearTimeOut(times)
  x = e.touches[0].pageX
  y = e.touches[0].pageY
  publicPos.x = x
  publicPos.y = y
})

$('html').on('touchend', e => {
  touchTag = false
  clearInterval(timer)
})

function setElementPos(e, POS) {
  $(e).css({ left: POS.x + 'px', top: POS.y + 'px' })
}

function clearTimeOut(times) {
  times.forEach((item, index) => {
    if (item) {
      clearTimeout(item)
    }
  })
}

function interValSetPos() {
  buttonPos.push(publicPos)
  buttonPos.shift()
  buttons.forEach((item, index) => {
    setElementPos(item, buttonPos[index])
  })
}

function throttle(func, wait, options) {
  var context, args, result
  var timeout = null
  var previous = 0
  if (!options) options = {}
  var later = function() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function() {
    var now = Date.now()
    if (!previous && options.leading === false) previous = now //如果需要首次直接调用
    var remaining = wait - (now - previous) // 获取距离延迟目标的时间 <0 则达到目标
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now // 重新设置这次调用的事件，为下一次计算延迟做准备
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      // 禁止最后一次自动调用
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

function curry(fn, a = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curryied(nextArgs) {
      const args = prevArgs.concat([nextArgs])

      if (args.length >= a) {
        return fn(...args)
      } else {
        return nextCurried(args)
      }
    }
  })([])
}

function mCurry(fn, a = fn.length) {
  let args = []
  return function Curried(nextArgs) {}
}

function arryIntsertToTail(ary, item) {
  let res = []
  for (let i = ary.length; --i; ) {
    res[i - 1] = ary[i]
  }
  res.push(item)
  return res
}



$(document).ready(function() {
	var sub = $("#sub");
	var activeRow, //  已激活的一级菜单
		activeMenu; //  已激活的子级菜单

	var timer;

	// 鼠标是否在子菜单里
	var mouseInSub = false;
	sub.on("mouseenter", function() {
		mouseInSub = true;
	})
	.on("mouseleave", function() {
		mouseInSub = false;
	});

	// 记录鼠标的位置
	var mouseTrack = [];
	var moveHandler = function(e) {
		mouseTrack.push({
			x: e.pageX,
			y: e.pageY
		});

		// 只需要当前点和上一个点
		if (mouseTrack.length > 3) {
			mouseTrack.shift();
		}
	};

	// 此处只能给整个菜单注册，而非只给一级菜单加，否则timer中的回调执行时，activeRow已为空
	$("#wrap").on("mouseenter",	function() {
		sub.removeClass("none");
		$(document).bind("mousemove", moveHandler);// 用于记录鼠标位置
	})
	.on("mouseleave", function() {
		sub.addClass("none");

		if (activeRow) {
			activeRow.removeClass("active");
			activeRow = null;
		}
		if (activeMenu) {
			activeMenu.addClass("none");
			activeMenu = null;
		}

		$(document).unbind("mousemove", moveHandler); // 注意解绑，以免影响其他组件
	})
	.on("mouseenter", "li", function(e) {
		if (!activeRow) {
			active(e.target);
			return;
		}
		if (timer) {
			clearTimeout(timer);
		}

		var curMouse = mouseTrack[mouseTrack.length - 1]; // 鼠标当前坐标
		var prevMouse = mouseTrack[mouseTrack.length - 2]; // 鼠标上一次坐标
		// console.log(curMouse, prevMouse);
		var delay = needDelay(sub, curMouse, prevMouse);

		if (delay) {
			// 加入延迟器，解决斜方移动切换，只能折线移动的问题
			timer = setTimeout(function() {
					if (mouseInSub) {
						return;
					}
					activeRow.removeClass("active");
					activeMenu.addClass("none");
					active(e.target);

					timer = null;
				}, 300);
		} else {
			activeRow.removeClass("active");
			activeMenu.addClass("none");
			active(e.target);
		}
	});

	function active(target) {
		activeRow = $(target);
		activeRow.addClass("active");
		activeMenu = $("#" + activeRow.data("id"));
		activeMenu.removeClass("none");
	}
});


// 向量是终点坐标减去起点坐标
function vector(a, b) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  };
}

// 向量的叉乘
function vectorPro(v1, v2) {
  return v1.x * v2.y - v1.y * v2.x;
}

// 用位运算高效判断符号相同
function sameSign(a, b) {
  return (a ^ b) >= 0;
}

// 判断点是否在三角形内
function isPointInTranjgle(p, a, b, c) {
  var pa = vector(p, a);
  var pb = vector(p, b);
  var pc = vector(p, c);

  var t1 = vectorPro(pa, pb);
  var t2 = vectorPro(pb, pc);
  var t3 = vectorPro(pc, pa);

  return sameSign(t1, t2) && sameSign(t2, t3);
}

// 是否需要延迟
function needDelay(ele, curMouse, prevMouse) {
  if (!curMouse || !prevMouse) {
    return;
  }
  var offset = ele.offset();

  // 左上点
  var topleft = {
    x: offset.left,
    y: offset.top
  };
  // 左下点
  var leftbottom = {
    x: offset.left,
    y: offset.top + ele.height()
  };

  return isPointInTranjgle(curMouse, prevMouse, topleft, leftbottom);
}

