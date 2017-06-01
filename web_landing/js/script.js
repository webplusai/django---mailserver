'use strict';
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor
    }
}();
var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
    return typeof obj
} : function(obj) {
    return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj
};
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function')
    }
}
if (jQuery('#bg-animation-constellation').length && isMobile === false) {
    var mouseX,
        mouseY,
        windowHalfX,
        windowHalfY,
        SEPARATION,
        AMOUNTX,
        AMOUNTY,
        camera,
        scene,
        renderer;
    (function() {
        var init = function init() {
            var container,
                separation = 100,
                amountX = 50,
                amountY = 50,
                particles,
                particle;
            container = document.createElement('div');
            document.body.appendChild(container);
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 100;
            scene = new THREE.Scene;
            renderer = new THREE.CanvasRenderer({
                alpha: true
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);
            var PI2 = Math.PI * 2;
            var material = new THREE.SpriteCanvasMaterial({
                color: 16777215,
                program: function program(context) {
                    context.beginPath();
                    context.arc(0, 0, 0.5, 0, PI2, true);
                    context.fill()
                }
            });
            var geometry = new THREE.Geometry;
            for (var i = 0; i < 100; i++) {
                particle = new THREE.Sprite(material);
                particle.position.x = Math.random() * 2 - 1;
                particle.position.y = Math.random() * 2 - 1;
                particle.position.z = Math.random() * 2 - 1;
                particle.position.normalize();
                particle.position.multiplyScalar(Math.random() * 10 + 450);
                particle.scale.x = particle.scale.y = 10;
                scene.add(particle);
                geometry.vertices.push(particle.position)
            }
            var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: 16777215,
                opacity: 0.5
            }));
            scene.add(line);
            document.addEventListener('mousemove', onDocumentMouseMove, false);
            document.addEventListener('touchstart', onDocumentTouchStart, false);
            document.addEventListener('touchmove', onDocumentTouchMove, false);
            window.addEventListener('resize', onWindowResize, false)
        };
        var onWindowResize = function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight)
        };
        var onDocumentMouseMove = function onDocumentMouseMove(event) {
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY
        };
        var onDocumentTouchStart = function onDocumentTouchStart(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY
            }
        };
        var onDocumentTouchMove = function onDocumentTouchMove(event) {
            if (event.touches.length == 1) {
                event.preventDefault();
                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY
            }
        };
        var animate = function animate() {
            requestAnimationFrame(animate);
            render()
        };
        var render = function render() {
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY + 200 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
            renderer.render(scene, camera)
        };
        mouseX = 0;
        mouseY = 0;
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        SEPARATION = 200;
        AMOUNTX = 10;
        AMOUNTY = 10;
        init();
        animate()
    })()
}
if (jQuery('#bg-animation-dots').length && isMobile === false) {
    var container;
    var camera,
        scene,
        renderer;
    var mouseX,
        mouseY;
    var windowHalfX;
    var windowHalfY;
    (function() {
        var init = function init() {
            container = document.createElement('div');
            document.body.appendChild(container);
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.set(100000, 0, 3200);
            scene = new THREE.Scene;
            var colors = [0, 16250871, 14540253, 16777215];
            var geometry = new THREE.Geometry;
            for (var i = 0; i < 2000; i++) {
                var vertex = new THREE.Vector3;
                vertex.x = Math.random() * 4000 - 2000;
                vertex.y = Math.random() * 4000 - 2000;
                vertex.z = Math.random() * 4000 - 2000;
                geometry.vertices.push(vertex);
                geometry.colors.push(new THREE.Color(colors[Math.floor(Math.random() * colors.length)]))
            }
            var material = new THREE.PointsMaterial({
                size: 1,
                vertexColors: THREE.VertexColors,
                depthTest: false,
                opacity: 0.5,
                sizeAttenuation: false,
                transparent: true
            });
            var mesh = new THREE.Points(geometry, material);
            scene.add(mesh);
            renderer = new THREE.WebGLRenderer({
                preserveDrawingBuffer: true,
                alpha: true
            });
            renderer.setClearColor(0, 0);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.sortObjects = false;
            renderer.autoClearColor = false;
            container.appendChild(renderer.domElement);
            document.addEventListener('mousemove', onDocumentMouseMove, false);
            window.addEventListener('resize', onWindowResize, false)
        };
        var onWindowResize = function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight)
        };
        var onDocumentMouseMove = function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) * 10;
            mouseY = (event.clientY - windowHalfY) * 10
        };
        var animate = function animate() {
            requestAnimationFrame(animate);
            render()
        };
        var render = function render() {
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
            renderer.render(scene, camera)
        };
        mouseX = 0;
        mouseY = 0;
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        init();
        animate()
    })()
}
if (jQuery('#bg-animation-space').length && isMobile === false) {
    var width,
        height,
        scene,
        clock,
        deltaTime,
        fov,
        aspectRatio,
        near,
        far,
        camera,
        renderer,
        maxParticles,
        particles,
        particleMaterial,
        particleSystem;
    var i;
    var particle;
    (function() {
        var render = function render() {
            requestAnimationFrame(render);
            deltaTime = clock.getDelta();
            particleSystem.rotation.y += deltaTime / 4;
            renderer.render(scene, camera)
        };
        var random = function random(min, max) {
            if (isNaN(max)) {
                max = min;
                min = 0
            }
            return Math.random() * (max - min) + min
        };
        var resize = function resize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight)
        };
        width = window.innerWidth;
        height = window.innerHeight;
        scene = new THREE.Scene;
        clock = new THREE.Clock;
        deltaTime = 0;
        fov = 75;
        aspectRatio = width / height;
        near = 0.1;
        far = 1000;
        maxParticles = 750;
        if (window.WebGLRenderingContext) {
            renderer = new THREE.WebGLRenderer({
                alpha: true
            })
        } else {
            renderer = new THREE.CanvasRenderer({
                alpha: true
            })
        }
        renderer.setSize(width, height);
        document.body.appendChild(renderer.domElement);
        camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 300;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        particles = new THREE.Geometry;
        for (i = 0; i < maxParticles; i++) {
            particle = new THREE.Vector3(random(-400, 400), random(-200, 200), random(-300, 300));
            particles.vertices.push(particle)
        }
        particleMaterial = new THREE.ParticleBasicMaterial({
            color: 16250871,
            size: 1,
            transparent: true
        });
        particleSystem = new THREE.ParticleSystem(particles, particleMaterial);
        particleSystem.sortParticles = true;
        scene.add(particleSystem);
        render();
        window.addEventListener('resize', resize, false)
    })()
}
var bgSlideshow = {
    init: function init() {
        'use strict';
        var self = this;
        var imageBackgroundTimer = null;
        var imageBackgroundsContainer = jQuery('#page-background-slideshow');
        var imageBackgrounds = imageBackgroundsContainer.find('.page-background-image');
        var imageBackgroundsSpeed = parseInt(imageBackgroundsContainer.data('speed'), 10) || 6000;
        var imageBackgroundsLoop = function imageBackgroundsLoop() {
            var current = imageBackgrounds.filter('.current');
            var next = current.next();
            current.removeClass('current');
            if (next.length < 1) {
                next = imageBackgrounds.filter(':first')
            }
            next.addClass('current');
            imageBackgroundTimer = setTimeout(imageBackgroundsLoop, imageBackgroundsSpeed)
        };
        if (imageBackgrounds.length) {
            imageBackgroundTimer = setTimeout(imageBackgroundsLoop, imageBackgroundsSpeed)
        }
    }
};
bgSlideshow.init();
var videoPlayer;
var bgVideo = {
    init: function init() {
        'use strict';
        var self = this;
        var backgroundContainer = jQuery('#page-background-video');
        if (typeof backgroundContainer.attr('data-image') !== 'undefined') {
            $('html').css('background-image', 'url(' + backgroundContainer.attr('data-image') + ')')
        }
        if (typeof backgroundContainer.attr('data-video') !== 'undefined' && isMobile === false) {
            var videoUrl = backgroundContainer.attr('data-video');
            backgroundContainer.html('<video id="background-video-player" src="' + videoUrl + '" class="video-js" preload="auto" muted></video>');
            if (typeof videojs !== 'undefined') {
                if (videoUrl.indexOf('youtube.com') > 0 || videoUrl.indexOf('youtu.be') > 0) {
                    videojs(document.getElementById('background-video-player'), {
                        'techOrder': ['youtube'],
                        loop: true,
                        sources: [{
                            type: 'video/youtube',
                            src: videoUrl
                        }]
                    }, function() {
                        videoPlayer = this;
                        this.muted(true);
                        this.userActive(false);
                        this.play();
                        var hash = window.location.hash;
                        if ((typeof hash === 'undefined' ? 'undefined' : _typeof(hash)) !== undefined) {
                            var section = jQuery(hash + '-section');
                            if (section.length) {
                                videoPlayer.pause();
                                if (typeof countdownDate != 'undefined') {
                                    clearInterval(countdownInterval)
                                }
                                if (typeof imageBackgroundTimer != 'null') {
                                    clearTimeout(imageBackgroundTimer)
                                }
                            }
                        }
                    })
                } else {
                    videojs(document.getElementById('background-video-player'), {
                        'techOrder': ['html5'],
                        loop: true,
                        sources: [{
                            type: 'video/mp4',
                            src: videoUrl
                        }]
                    }, function() {
                        videoPlayer = this;
                        this.muted(true);
                        this.userActive(false);
                        this.play();
                        var hash = window.location.hash;
                        if ((typeof hash === 'undefined' ? 'undefined' : _typeof(hash)) !== undefined) {
                            var section = jQuery(hash + '-section');
                            if (section.length) {
                                videoPlayer.pause();
                                if (typeof countdownDate != 'undefined') {
                                    clearInterval(countdownInterval)
                                }
                                if (typeof imageBackgroundTimer != 'null') {
                                    clearTimeout(imageBackgroundTimer)
                                }
                            }
                        }
                    })
                }
                var adjustVideoSize = function adjustVideoSize() {
                    var playerElement = jQuery('#background-video-player_html5_api');
                    if (playerElement.length < 1) {
                        playerElement = jQuery('#background-video-player_Youtube_api');
                        playerElement.css({
                            'width': '160px',
                            'height': '90px'
                        })
                    }
                    var mediaAspect = 16 / 9,
                        playerWidth = jQuery(window).width(),
                        playerHeight = jQuery(window).height(),
                        playerAspect = playerWidth / playerHeight;
                    if (playerAspect < mediaAspect) {
                        playerElement.width(playerHeight * mediaAspect + 4).height(playerHeight).css('left', -Math.round((playerHeight * mediaAspect - playerWidth) / 2)).css('top', 0)
                    } else {
                        playerElement.height(playerWidth / mediaAspect).width(playerWidth + 4).css('top', -Math.round((playerWidth / mediaAspect - playerHeight) / 2)).css('left', 0)
                    }
                };
                jQuery(window).on('resize', adjustVideoSize);
                adjustVideoSize()
            }
        }
    }
};
bgVideo.init();
var contactFormElem = jQuery('#contact-form');
if (!!contactFormElem) {
    contactFormElem.submit(function(e) {
        var postData = contactFormElem.serializeArray();
        var formURL = window.location.href;
        formURL = formURL.substring(0, formURL.lastIndexOf('/') + 1);
        formURL = formURL + contactFormElem.attr('action');
        jQuery.ajax({
            url: formURL,
            type: 'POST',
            data: postData,
            success: function success(data, textStatus, jqXHR) {
                contactFormElem.find('input[type=text], textarea').val('');
                jQuery('#contact-form-response').css({
                    'padding-bottom': '1rem'
                }).html(data);
                if (isMobile === false) {
                    var target = jQuery('#contact-form-response');
                    target.closest('.page-section-content').mCustomScrollbar('scrollTo', target.position().top)
                } else {
                    jQuery('html').animate({
                        scrollTop: jQuery('#contact-form-response').position().top
                    }, 500)
                }
            },
            error: function error(jqXHR, textStatus, errorThrown) {
                jQuery('#contact-form-response').css({
                    'padding-bottom': '1rem'
                }).html('Connection error occurred. Message not sent.');
                if (isMobile === false) {
                    var target = jQuery('#contact-form-response');
                    target.closest('.page-section-content').mCustomScrollbar('scrollTo', target.position().top)
                } else {
                    jQuery('html').animate({
                        scrollTop: jQuery('#contact-form-response').position().top
                    }, 500)
                }
            }
        });
        e.preventDefault()
    })
}
var cookies = {
    cookiesCheck: jQuery.cookie('info_cookie') || false,
    init: function init() {
        'use strict';
        var self = this;
        if (!self.cookiesCheck) {
            jQuery('#cookies-section').removeClass('hidden')
        }
        self.cookiepolicy();
        $('#policy-btn').on('click', function(e) {
            e.preventDefault();
            var thisBtn = $(this);
            var target = $('body').find($(this).attr('href'));
            var mainSections = target.siblings('section');
            if (target.hasClass('is-active') === false) {
                target.addClass('is-active');
                $('#nav-list').find('a').removeClass('is-active');
                mainSections.animate({
                    'opacity': 0
                }, 300, function() {
                    $('html,body').scrollTop(0);
                    mainSections.removeClass('is-active').addClass('main-section--hidden').css({
                        'opacity': 1
                    });
                    target.removeClass('main--hidden');
                    target.css({
                        'opacity': 0
                    }).removeClass('main-section--hidden').animate({
                        'opacity': 1
                    }, 300)
                })
            }
            $('#nav-mobile').removeClass('is-active')
        })
    },
    cookiepolicy: function cookiepolicy() {
        'use strict';
        jQuery('#cookies-section').find('#cookies-accept').on('click', function(e) {
            e.preventDefault();
            this.cookiesCheck = jQuery.cookie('info_cookie', '1', {
                expires: 365,
                path: '/'
            });
            jQuery('#cookies-section').addClass('hidden')
        })
    }
};
cookies.init();
var Counter = function() {
    function Counter(dateString, directionNumber) {
        _classCallCheck(this, Counter);
        this.countdownInterval = null;
        if (typeof dateString != 'undefined') {
            this.targetDate = Date.parse(dateString) / 1000;
            this.counterDirection = directionNumber
        }
    }
    _createClass(Counter, [{
        key: 'start',
        value: function start() {
            var self = this;
            self.totalSecondsElement = jQuery('#timerTotalSeconds');
            self.daysElement = jQuery('#timerDays');
            self.countdownInterval = setInterval(function() {
                self.countdownTimer()
            }, 1000);
            self.countdownTimer()
        }
    }, {
        key: 'stop',
        value: function stop() {
            clearInterval(this.countdownInterval)
        }
    }, {
        key: 'countdownTimer',
        value: function countdownTimer() {
            'use strict';
            var self = this;
            if (!isNaN(this.targetDate)) {
                var currentDate = Math.floor(jQuery.now() / 1000),
                    days,
                    hours,
                    minutes,
                    seconds,
                    totalSeconds;
                if (this.counterDirection == 0) {
                    if (this.targetDate <= currentDate) {
                        clearInterval(this.countdownInterval);
                        return
                    }
                    seconds = this.targetDate - currentDate
                } else {
                    if (currentDate <= this.targetDate) {
                        clearInterval(this.countdownInterval);
                        return
                    }
                    seconds = currentDate - this.targetDate
                }
                totalSeconds = seconds;
                days = Math.floor(seconds / (60 * 60 * 24));
                seconds = seconds - days * 60 * 60 * 24;
                hours = Math.floor(seconds / (60 * 60));
                seconds = seconds - hours * 60 * 60;
                minutes = Math.floor(seconds / 60);
                seconds = seconds - minutes * 60;
                days = String(days).length >= 2 ? days : '0' + days;
                hours = String(hours).length >= 2 ? hours : '0' + hours;
                minutes = String(minutes).length >= 2 ? minutes : '0' + minutes;
                seconds = String(seconds).length >= 2 ? seconds : '0' + seconds;
                if (self.daysElement.is(':visible')) {
                    self.daysElement.text(days)
                }
                if (self.totalSecondsElement.is(':visible')) {
                    self.totalSecondsElement.text(totalSeconds)
                }
            } else {
                clearInterval(this.countdownInterval);
                alert('The entered date is invalid or not in the correct format. \n\nPlease use the format: DD MONTH YYYY HH:MM:SS\nFor example: 21 march 2016 20:30:02')
            }
        }
    }]);
    return Counter
}();
var counter = new Counter(countdownDate, counterDirection);
counter.start();
var Header = function() {
    function Header(headerContainer) {
        _classCallCheck(this, Header);
        this.mainElement = $('body').find('#main');
        this.headerElement = headerContainer;
        this.navMobileElement = this.headerElement.find('#nav-mobile');
        this.navMenuElements = this.headerElement.find('#nav-list a');
        this.pinHeaderEvents();
        this.pinMenuEvents()
    }
    _createClass(Header, [{
        key: 'pinMenuEvents',
        value: function pinMenuEvents() {
            var self = this;
            self.navMobileElement.on('click', function(e) {
                e.preventDefault();
                $(this).toggleClass('is-active');
                self.mainElement.toggleClass('main--hidden')
            });
            self.navMenuElements.on('click', function(e) {
                e.preventDefault();
                var thisBtn = $(this);
                var target = $('#main').find($(this).attr('href'));
                if (target.hasClass('is-active') === false) {
                    target.addClass('is-active');
                    thisBtn.addClass('is-active').closest('li').siblings().children('a').removeClass('is-active');
                    target.siblings().animate({
                        'opacity': 0
                    }, 300, function() {
                        $('html,body').scrollTop(0);
                        target.siblings().removeClass('is-active').addClass('main-section--hidden').css({
                            'opacity': 1
                        });
                        self.mainElement.removeClass('main--hidden');
                        target.css({
                            'opacity': 0
                        }).removeClass('main-section--hidden').animate({
                            'opacity': 1
                        }, 300)
                    })
                }
                self.navMobileElement.removeClass('is-active')
            })
        }
    }, {
        key: 'pinHeaderEvents',
        value: function pinHeaderEvents() {
            var self = this;
            $(window).on('scroll', function(e) {
                if ($(window).scrollTop() > 1) {
                    self.headerElement.addClass('main-header--highlight')
                } else {
                    self.headerElement.removeClass('main-header--highlight')
                }
            })
        }
    }]);
    return Header
}();
var header = new Header(jQuery('#main-header'));
jQuery('#subscribe-form').each(function() {
    var form = $(this);
    form.submit(function(e) {
        var postData = form.serializeArray(),
            formURL = form.attr('action'),
            formMethod = form.attr('method'),
            responseElement = form.find('#subscribe-response');
        jQuery.ajax({
            url: formURL,
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: postData,
            success: function success(data, textStatus, jqXHR) {
                var message = data.message;
                responseElement.hide().css({
                    'padding-bottom': '1rem'
                }).html(message).fadeIn()
            },
            error: function error(jqXHR, textStatus, errorThrown) {
                responseElement.hide().css({
                    'padding-bottom': '1rem'
                }).html('Could not connect to server. Please try again later.').fadeIn()
            }
        });
        e.preventDefault()
    })
});
var Loader = function() {
    function Loader(element) {
        _classCallCheck(this, Loader);
        var self = this;
        this.bodyElement = $('body');
        this.loadingElement = element;
        $(window).on('load', function() {
            self.destroy()
        })
    }
    _createClass(Loader, [{
        key: 'destroy',
        value: function destroy() {
            var self = this;
            setTimeout(function() {
                self.loadingElement.fadeOut(600, function() {
                    self.bodyElement.removeClass('loading');
                    self.loadingElement.remove();
                    setTimeout(function() {
                        self.bodyElement.removeClass('loading2')
                    }, 600);
                    setTimeout(function() {
                        self.bodyElement.removeClass('loading3')
                    }, 1200)
                })
            }, 1000)
        }
    }]);
    return Loader
}();
if ($('body').hasClass('loading') && $('#loading').length) {
    var loader = new Loader($('#loading'))
}
