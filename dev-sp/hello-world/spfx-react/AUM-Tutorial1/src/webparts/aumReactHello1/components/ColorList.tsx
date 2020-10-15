import * as React from 'react';

import { IColor } from '../IColor';

import { List } from 'office-ui-fabric-react/lib/List';
import { Button, DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface IColorListProps {
    colors: IColor[];
}

export class ColorList extends React.Component<IColorListProps, {}> {
    public render(): React.ReactElement<IColorListProps> {
        return (
            <List items={this.props.colors}
                onRenderCell={this._onRenderListCell}

            />
        );
    }

    private _onRenderListCell = (color: IColor, index: number | undefined): JSX.Element => {
        return (
            <div>
                {color.Title}<br />
                <DefaultButton text="Delete" onClick={() => this._onButtonClick(color)} />
            </div>
        )
    }

    private _onButtonClick (color: IColor) :void {
        console.log('Clicked Delete for Color',color)
    }
}
