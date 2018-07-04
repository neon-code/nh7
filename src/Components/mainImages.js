import React from 'react';
import '../CSS/primary.css';
import { Button, Image, Icon, Label, Header, Modal } from 'semantic-ui-react';

var fileDir = [
    { fileName: './50images/n01558993_155.JPEG', id: "n01558993" },
    { fileName: './50images/n01630670_89.JPEG', id: "n01630670" },
    { fileName: './50images/n01677366_1675.JPEG', id: "n01677366" },
    { fileName: './50images/n01693334_143.JPEG', id: "n01693334" },
    { fileName: './50images/n01697457_118.JPEG', id: "n01697457" },
    { fileName: './50images/n01737021_589.JPEG', id: "n01737021" },
    { fileName: './50images/n01773549_15.JPEG', id: "n01773549" },
    { fileName: './50images/n01824575_202.JPEG', id: "n01824575" },
    { fileName: './50images/n01871265_89.JPEG', id: "n01871265" },
    { fileName: './50images/n01873310_379.JPEG', id: "n01873310" },
    { fileName: './50images/n02011460_309.JPEG', id: "n02011460" },
    { fileName: './50images/n02085782_267.JPEG', id: "n02085782" },
    { fileName: './50images/n02091467_13583.JPEG', id: "n02091467" },
    { fileName: './50images/n02096051_6775.JPEG', id: "n02096051" },
    { fileName: './50images/n02097298_12041.JPEG', id: "n02097298" },
    { fileName: './50images/n02108422_2679.JPEG', id: "n02108422" },
    { fileName: './50images/n02123159_109.JPEG', id: "n02123159" },
    { fileName: './50images/n02165456_943.JPEG', id: "n02165456" },
    { fileName: './50images/n02177972_2.JPEG', id: "n02177972" },
    { fileName: './50images/n02206856_132.JPEG', id: "n02206856" },
    { fileName: './50images/n02256656_69.JPEG', id: "n02256656" },
    { fileName: './50images/n02281406_401.JPEG', id: "n02281406" },
    { fileName: './50images/n02356798_28.JPEG', id: "n02356798" },
    { fileName: './50images/n02443114_332.JPEG', id: "n02443114" },
    { fileName: './50images/n02445715_70.JPEG', id: "n02445715" },
    { fileName: './50images/n02704792_559.JPEG', id: "n02704792" },
    { fileName: './50images/n02814533_614.JPEG', id: "n02814533" },
    { fileName: './50images/n02871525_482.JPEG', id: "n02871525" },
    { fileName: './50images/n02906734_75.JPEG', id: "n02906734" },
    { fileName: './50images/n02948072_386.JPEG', id: "n02948072" },
    { fileName: './50images/n03000684_425.JPEG', id: "n03000684" },
    { fileName: './50images/n03075370_387.JPEG', id: "n03075370" },
    { fileName: './50images/n03188531_26.JPEG', id: "n03188531" },
    { fileName: './50images/n03271574_572.JPEG', id: "n03271574" },
    { fileName: './50images/n03297495_93.JPEG', id: "n03297495" },
    { fileName: './50images/n03444034_109.JPEG', id: "n03444034" },
    { fileName: './50images/n03485794_1024.JPEG', id: "n03485794" },
    { fileName: './50images/n03617480_341.JPEG', id: "n03617480" },
    { fileName: './50images/n03662601_373.JPEG', id: "n03662601" },
    { fileName: './50images/n03673027_359.JPEG', id: "n03673027" },
    { fileName: './50images/n03763968_154.JPEG', id: "n03763968" },
    { fileName: './50images/n03785016_626.JPEG', id: "n03785016" },
    { fileName: './50images/n03876231_1382.JPEG', id: "n03876231" },
    { fileName: './50images/n03930313_1116.JPEG', id: "n03930313" },
    { fileName: './50images/n03954731_9.JPEG', id: "n03954731" },
    { fileName: './50images/n04074963_224.JPEG', id: "n04074963" },
    { fileName: './50images/n04252077_182.JPEG', id: "n04252077" },
    { fileName: './50images/n04347754_1531.JPEG', id: "n04347754" },
    { fileName: './50images/n04465501_75.JPEG', id: "n04465501" },
    { fileName: './50images/n04505470_250.JPEG', id: "n04505470" },          
]

var activeIndex = Math.floor(Math.random() * 50), usedImages = [activeIndex], taskDone = 1, flag;
var timeTaken = { minutes: 0, seconds: 0, milsec: 0 }, addTime = [0, 0, 0], avgTime = [], Interval;
var fileName = fileDir[activeIndex].fileName;

export class MainImages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isopen: false,
            activeNext: false,
            buttonText: "Next Button"
        };
    }

    componentDidMount() {
        alert("* Please disable AdBlock and any other antivirus software before you begin!\n Make sure to \"Allow\" popups/cookies on this app! *");
        this.props.onRef(this)
    }

    updateButton() {
        this.state.activeNext ? this.setState({ activeNext: false }) : this.setState({ activeNext: true })
    }

    OnFinish() {
        //To find the Average time
        let td = taskDone - 1;
        avgTime[0] = addTime[0] / td;
        avgTime[1] = addTime[1] / td;
        avgTime[2] = addTime[2] / td;

        avgTime[1] += (avgTime[0] * 60) % 60;
        avgTime[2] += (avgTime[1] * 100) % 100;

        avgTime[0] = Math.floor(avgTime[0]);
        avgTime[1] = Math.floor(avgTime[1]);
        avgTime[2] = Math.floor(avgTime[2]);

        this.props.onFinish(addTime, avgTime);
    }

    startTimer() {
        timeTaken.milsec++;

        if (timeTaken.milsec > 99) {
            timeTaken.seconds++;
            timeTaken.milsec = 0;
        }

        if (timeTaken.seconds > 59) {
            timeTaken.minutes++;
            timeTaken.seconds = 0;
        }
    }

    startWatch() {
        Interval = setInterval(this.startTimer, 10);
    }

    changeImage() {
        //Pause the StopWatch
        clearInterval(Interval);
        this.updateButton();

        //To pass values to Parent (App.js);
        let t = timeTaken.minutes + ":" + timeTaken.seconds + ":" + timeTaken.milsec;
        this.props.onNextImage(fileDir[activeIndex].fileName, fileDir[activeIndex].id, t);

        //Add the time to find total time take
        if( taskDone === 50 )
        this.setState({ buttonText: "Finish!" })

        addTime[2] += timeTaken.milsec;
        if (addTime[2] > 99) {
            addTime[1] += Math.floor(addTime[2] / 100);
            addTime[2] %= 100;
        }
        addTime[1] += timeTaken.seconds;
        if (addTime[1] > 59) {
            addTime[0] += Math.floor(addTime[1] / 60);
            addTime[1] %= 60;
        }
        addTime[0] += timeTaken.minutes;
        
        //Clear the StopWatch
        timeTaken.milsec = timeTaken.seconds = timeTaken.minutes = 0;

        //Load next image
        taskDone++;
        //Change here to lock the images
        if (taskDone > 50) {
            this.setState({
                isopen: true
            })
        }
        else
            do {
                flag = true;
                activeIndex = Math.floor(Math.random() * 50);

                for (var i = 0; i < usedImages.length; i++)
                    if (usedImages[i] === activeIndex)
                        flag = false;

                if (flag === true) {
                    usedImages.push(activeIndex);
                    fileName= fileDir[activeIndex].fileName;
                }
            } while (flag !== true);

        //Start the Watch
        this.startWatch();
    }

    render() {
        return (
            <div>
                <Image className="imageStyling" src={fileName} />

                <Label style={{ zIndex: "1", position: "fixed", top: "10px", right: '4vw' }} color="teal">
                    {taskDone}/50
                </Label>

                <div className="NextButton" style={{ width: '180px' }} >
                    {this.state.activeNext ?
                        <Button primary animated size='huge' onClick={this.changeImage.bind(this)}>
                            <Button.Content visible> {this.state.buttonText} </Button.Content>
                            <Button.Content hidden>
                                <Icon name='right arrow' />
                            </Button.Content>
                        </Button>
                        :
                        <Button disabled size='huge'>{this.state.buttonText}</Button>
                    }
                </div>

                <Modal open={this.state.isopen} basic dimmer="blurring" style={{ position: "fixed", width: "auto", marginTop: "30vh", marginLeft: "38vw" }}>
                    <Header icon='check square outline' style={{ textAlign: "center" }} content='Task Completed!' />
                    <Modal.Content>
                        <h2> Thank you for your participation! <br />
                            Please download the result. </h2>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' inverted onClick={this.OnFinish.bind(this)}>
                        <Icon name='download icon' /> Download Result
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}