import * as React from 'react'
import { IbuttonProps } from './buttonProps'
import { IbuttonState } from './buttonState'

export default class myButton extends React.Component<IbuttonProps,IbuttonState> {

    public constructor (props: IbuttonProps) {
        super(props);
        
        this.state = {buttonDisabled: false};
    }

    public render(): React.ReactElement<IbuttonProps> {

        return(
            this.props.buttonText ? 
        <button disabled = {this.state.buttonDisabled}>{this.props.buttonText}</button>
        :null
        );
    }
}