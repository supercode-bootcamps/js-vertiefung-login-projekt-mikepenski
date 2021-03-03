<script type="text/javascript">

    var timer = setInterval(function () {
        if (typeof window.ga === 'undefined') {
            return;
        }

        window._ga = window.ga;
        window.ga = function (command, type, category, action, label, value, object) {

            if (typeof gtag === 'function') {
                if ('event' === type) {
                    var params = {
                        'event': type,
                        'action': action,
                        'event_action': action,
                        'event_category': category
                    };
                    if (undefined !== label) {
                        params.event_label = label;
                    }
                    if (undefined !== value) {
                        params.value = value;
                    }
                    gtag(type, 'event', params); 
                } else {
                    window._ga(command, type, category, action, label, value, object);
                }
            }
        }

        clearInterval(timer);
    }, 1000);

</script>

