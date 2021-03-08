import {Theme, Colors, SimpleColors, NestedColors, ModedTheme} from './theme';



export default function (theme:Theme|ModedTheme ){
    const element = document.createElement("style");
    element.setAttribute('type','text/css');
    const cssStringCreator = new CssStringCreator(theme);
    element.textContent = cssStringCreator.getString();
    document.head.appendChild(element);
}

class CssStringCreator{
    private colors: NestedColors|SimpleColors;
    private variablesThatCanBeOverwritten = [
        '--background-body',
        '--background',
        '--text-main',
        '--text-bright',
        '--text-muted',
        '--border',
        '--button-hover',
        '--form-placeholder',
        '--form-text',
    ];
    public constructor(theme: Theme|ModedTheme){
        this.colors = theme.colors;
    }
    public getString(){
        return `
        ${this.getDefaultCssString()}
        ${this.getDarkModeCssString()}
    `;
    }
    private getDefaultCssString(){
        return `
        :root{
            ${this.variablesThatCanBeOverwritten.map(variable=>this.getOverwrite(variable,true))}
        }
    `;
    }
    private getDarkModeCssString(){
        return `
        @media (prefers-color-scheme:dark){
            :root{
                ${this.variablesThatCanBeOverwritten.map(variable=>this.getOverwrite(variable,false))}
            }
        }
    `;
    }
    private getOverwrite(variableName: string, isLightMode: boolean){
        let c ;
        if (isLightMode && this.isNestedColors(this.colors)){
            c = this.colors.light;
            return this.getVariableName(variableName, c);
        } else if (isLightMode && !this.isNestedColors(this.colors)){
            c = this.colors as SimpleColors;
            return this.getVariableName(variableName, c);
        } else if (!isLightMode && this.isNestedColors(this.colors)){
            c = this.colors.dark;
            return this.getVariableName(variableName, c);
        } else if (!isLightMode && !this.isNestedColors(this.colors)){
            c = this.colors as SimpleColors;
            return this.getVariableName(variableName, c);
        }
    }
    private getVariableName(variableName: string, c:SimpleColors){
        switch(variableName){//! add new variable overwrites here as desired
            case 'background':
                return `${variableName}:${c.background.default};`;
            default: 
                return '';
        }
    }
    private isNestedColors(colors: Colors): colors is NestedColors{
        try {
            return ((colors as NestedColors).light !== undefined);
        } catch(anyError){
            return false;
        }
    }
}
