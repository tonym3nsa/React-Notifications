import React, {Component} from 'react';

const iconClasses = {
    success: 'fas fa-check',
    warning: 'fas fa-exclamation-triangle',
    message: 'fas fa-bell',
    error: 'fas fa-times'
};

const minVisiblityTimeout = 5500; // 1.5 sec

function calculateVisibility(title, text) {

    let visibilityTimeout = (title.length + text.length) * 75;
    return visibilityTimeout > minVisiblityTimeout ? visibilityTimeout : minVisiblityTimeout;
}

function filterOnlyFirst(array, predicate) {
    const removeByIndex = (list, index) =>
        [
            ...list.slice(0, index),
            ...list.slice(index + 1)
        ];
    const indexOfFirstElement = array.findIndex(predicate);
    if (indexOfFirstElement < 0) return array;
    return removeByIndex(array, indexOfFirstElement);

}

class Toast extends Component {
    state = {
        queue: []
    }

    showNotification = ({title, text, level}) => {
        level = level.toLowerCase();
        const totalWaiting = this.state.queue.reduce(
            (a, b) => a + b.visibilityTimeout, 0
        );

        const visibilityTimeout = calculateVisibility(text, level);
        // const visibilityTimeout = 1000000;
        this.setState({
            queue: [
                ...this.state.queue,
                {title, text, level, visibilityTimeout}
            ]
        });


        console.log('will disappear after :', totalWaiting + visibilityTimeout);

        setTimeout(() => {
            const queueAfterRemoveMessage = filterOnlyFirst(this.state.queue, (item) => (
                item.title === title && item.level === level && item.text === text
            ))

            console.log('queueAfterRemoveMessage = ', queueAfterRemoveMessage);
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