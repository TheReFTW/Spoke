import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Formsy from 'formsy-react'
import { ScriptEditor } from './script_editor'
import Dialog from 'material-ui/Dialog'
import { ScriptTypes, allScriptFields } from '../../api/scripts/scripts'
import { FormsyText } from 'formsy-material-ui/lib'
import Divider from 'material-ui/Divider'
import { muiTheme } from '../../ui/theme'
import { CampaignFormSectionHeading } from './campaign_form_section_heading'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/image/edit'
import IconButton from 'material-ui/IconButton'
import { ScriptList } from './script_list'
const styles = {
}
export class CampaignScriptsForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  // Purely for Formsy -- should find a better way
  componentDidMount() {
    const { onValid }  = this.props
    onValid()
  }

  submit(script, scriptData, callback) {
    console.log("script", scriptData)
    if (script && script._id) {
      const { onScriptChange } = this.props
      onScriptChange(script._id, scriptData, callback)
    } else {
      const { onScriptAdd } = this.props
      onScriptAdd(_.extend(script, scriptData), callback)
    }
  }

  render() {
    const {
      scripts,
      sampleContact,
      onValid,
      onInvalid,
      customFields,
    } = this.props

    console.log("RENDER", scripts)
    return (
        <Formsy.Form
          onValid={onValid}
          onInvalid={onInvalid}
        >
          <CampaignFormSectionHeading
            title="What do you want to say?"
          />
            <ScriptList
              scripts={scripts}
              duplicateCampaignResponses={false}
              subheader=''
              onSaveScript={this.submit}
            />
        </Formsy.Form>
    )
  }
}
