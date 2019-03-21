import React, {Component} from 'react';

const iconClasses = {
    success: 'fas fa-check',
    warning: 'fas fa-exclamation-triangle',
    message: 'fas fa-bell',
    error: 'fas fa-times'
};

const minVisiblityTimeout = 1500; // 1.5 sec

function calculateVisibility(title, text) {
    /**
     * Calculate visibility of toast notification depending on the length of text
     * @param  {String} title   The title of the toast notification
     * @param  {String} text    The message of the toast notification
     * @return {Number}         The time depending on the length of the text within the notification
     */
    let visibilityTimeout = (title.length + text.length) * 75;
    return visibilityTimeout > minVisiblityTimeout ? visibilityTimeout : minVisiblityTimeout;
}

function filterOnlyFirst(queue, clone) {
    /**
     * Remove timed out notification based on order
     * @param  {Array}      queue       List of active notifications
     * @param  {Function}   clone       Notification to remove

     */
    const removeByIndex = (list, index) =>
        [
            ...list.slice(0, index),
            ...list.slice(index + 1)
        ];
    const indexOfFirstElement = queue.findIndex(clone);
    if (indexOfFirstElement < 0) return queue;

    return removeByIndex(queue, indexOfFirstElement);

}

class Toast extends Component {
    state = {
        queue: []
    }

    showNotification = ({title, text, level}) => {
        /**
         * Calculate visibility of toast notification depending on the length of text
         * @param  {String} title   The title of the toast notification
         * @param  {String} text    The message of the toast notification
         * @param  {String} level   The type of notification. Can be only one of the following types at a time: 'success', 'warning', 'error' and 'message'
         */
        level = level.toLowerCase();
        const totalWaiting = this.state.queue.reduce(
            (a, b) => a + b.visibilityTimeout, 0
        );

        const visibilityTimeout = calculateVisibility(text, level);
        
        this.setState({
            queue: [
                ...this.state.queue,
                {title, text, level, visibilityTimeout}
            ]
        });


      
        setTimeout(() => {
            const queueAfterRemoveMessage = filterOnlyFirst(this.state.queue, (item) => (
                item.title === title && item.level === level && item.text === text
            ));

            this.setState({
                queue: queueAfterRemoveMessage
            })

        }, totalWaiting + visibilityTimeout);


    }

    render() {


        return (
            <div>
                {this.state.queue.map(({title, text, level}, i) => (
                    <div key={title + level + i} className={"toast animated fadeInRight shadow " + level}
                         style={{top: i * 130 + 10}}>
                        <div className="toast-icon">
                            <i className={iconClasses[level]}></i>
                        </div>
                        <div className="toast-body">
                            <h3>{title}</h3>
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>

        )
    }
}


export default Toast;