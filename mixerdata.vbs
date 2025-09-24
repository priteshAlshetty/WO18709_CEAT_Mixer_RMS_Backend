Sub update_mixerdata_tbl()
On Error Resume Next  ' Enable error handling without GoTo
HMIRuntime.Tags("QUERY_STATUS").Write 1
    Dim conn, cmd, sql, connStr
    Dim recipe
    Dim order_id, conveyer_status,batch_count,mixing_time
    Dim tank_no_1
    Dim shift
    Dim silica_code_1, silica_wt_1, CB_code_1, CB_wt_1,oil_code_1, oil_wt_1, delayed_chem_code_1, delayed_chem_wt_1
    Dim poly_code_1 ,poly_code_2 ,poly_code_3 ,poly_code_4 ,poly_code_5 ,poly_code_6 
    Dim poly_wt_1, poly_wt_2, poly_wt_3, poly_wt__wt_4, poly_wt_5, poly_wt_6
    Dim poly_total_wt, total_wt
    Dim truncatedStr, pos
    ' log data when trigger goes from 1 to zero
	Dim Trigger
	Trigger = HMIRuntime.Tags("MixerFD_Open").Read
	
	If Trigger = 0 Then
	
    connStr = "DRIVER={MySQL ODBC 8.0 ANSI DRIVER};SERVER=localhost;PORT=3306;user=root;Persist Security Info=False;Database=ceat_mixer_rms"

    ' Create and open database connection
    Set conn = CreateObject("ADODB.Connection")
    conn.Open connStr

    If Err.Number <> 0 Then
        ' HMIRuntime.Tags("QUERY_STATUS").Write "DB connection error: " & Err.Description
        Err.Clear
        Exit Sub
    End If
		shift = A ' add shift logic
    ' Read tags
    recipe = HMIRuntime.Tags("Running_Recipe").Read
    order_id = HMIRuntime.Tags("ORDER_ID").Read
    conveyer_status = HMIRuntime.Tags("SATO_FEEDBACK").Read
    batch_count = HMIRuntime.Tags("Mixer_Act_Batch").Read
    mixing_time = HMIRuntime.Tags("mixing_act_time").Read
    
    silica_code_1 = HMIRuntime.Tags("PLC_PDAct1").Read
    
    If silica_code_1=1 Then
    silica_code_1 = "R729"
    End If
    
    silica_wt_1 = HMIRuntime.Tags("Running_Recipe").Read
    tank_no_1 = HMIRuntime.Tags("Running_Recipe").Read
    
    If tank_no_1="1" Then
	CB_code_1="CB1-N330"
	
		Elseif tank_no_1="2" Then
		CB_code_1="CB2-N326"
		
			Elseif tank_no_1="3" Then
			CB_code_1="CB3-N220"
			
				Elseif tank_no_1="4" Then
				CB_code_1="CB4-N339"
				
					Elseif tank_no_1="5" Then
					CB_code_1="CB5-N660"
					
						Elseif tank_no_1="6" Then
						CB_code_1="CB6"
			
	Else 
	CB_code_1=""
	End If
    
    CB_wt_1 = HMIRuntime.Tags("Carbon_batch_weight").Read
    CB_wt_1 = CB_wt_1/100
    
    oil_code_1 = HMIRuntime.Tags("PLC_OilA1").Read
    
    If oil_code_1=1 Then
    oil_code_1 = "R6347"
    End If
    
    oil_wt_1 = HMIRuntime.Tags("OIL_Batch_Weight").Read
    
    delayed_chem_code_1= "delayed_chem"
    delayed_chem_wt_1 = HMIRuntime.Tags("delayed_chem_wt_1").Read

    poly_code_2 = HMIRuntime.Tags("Poly2Code").Read
    poly_code_1 = HMIRuntime.Tags("Poly1Code").Read
    poly_code_3 = HMIRuntime.Tags("Poly3Code").Read
    poly_code_4 = HMIRuntime.Tags("Poly4Code").Read
    poly_code_5 = HMIRuntime.Tags("Poly5Code").Read
    poly_code_6 = HMIRuntime.Tags("Poly6Code").Read
    
    poly_wt_1 = HMIRuntime.Tags("Poly1ActWt").Read
    poly_wt_2 = HMIRuntime.Tags("Poly2ActWt").Read
    poly_wt_3 = HMIRuntime.Tags("Poly3ActWt").Read
    poly_wt_4 = HMIRuntime.Tags("Poly4ActWt").Read
    poly_wt_5 = HMIRuntime.Tags("Poly5ActWt").Read
    poly_wt_6 = HMIRuntime.Tags("Poly6ActWt").Read
    
    poly_total_wt = poly_wt_1 + poly_wt_2 + poly_wt_3 + poly_wt_4 + poly_wt_5 + poly_wt_6
    total_wt = poly_total_wt + silica_wt_1 + CB_wt_1 + oil_wt_1 + delayed_chem_wt_1
    
pos = InStr(recipe, "[")

If pos > 0 Then
    truncatedStr = Left(recipe, pos - 1)
Else
    truncatedStr = recipe
End If

sql = "INSERT INTO `mixerdata`(`Order_ID`, `Machine_ID`, `OK_flag`, `shift`,  `Compound_batch_count`, "& _
" `RECIPE_ID`, `Mixing_time`, `silica_code_1`, `silica_weight_1`, `Carbon_code_1`, `Carbon_weight_1`,"& _
" `Oil_code_1`, `Oil_weight_1`, `Polymer_weight_total`, `Polymer_Chemical_code_1`, `Polymer_Chemical_weight_1`, "& _
" `Polymer_Chemical_code_2`, `Polymer_Chemical_weight_2`, `Polymer_Chemical_code_3`, `Polymer_Chemical_weight_3`, "& _
"`Polymer_Chemical_code_4`, `Polymer_Chemical_weight_4`, `Polymer_Chemical_code_5`, `Polymer_Chemical_weight_5`, `Polymer_Chemical_code_6`,"&_
" `Polymer_Chemical_weight_6`,`Delyed_Chemical_code_1`, `Delyed_Chemical_weight_1`,`Total_weight`) VALUES ( "&_
" '"&order_id&"' , 'MIX001' , '"&conveyer_status&"',  '"&shift&"',  '"&batch_count&"','"&truncatedStr&"' "& _
",'"&mixing_time &"','"&silica_code_1&"','"&silica_wt_1&"','"&CB_code_1&"', '"&CB_wt_1&"', '"&oil_code_1&"' ,'"&oil_wt_1&"' "&_
" ,'"&poly_total_wt&"','"&poly_code_1&"','"&poly_wt_1&"','"&poly_code_2&"','"&poly_wt_2&"','"&poly_code_3&"', '"&poly_wt_3&"' "&_
" ,'"&poly_code_4&"' ,'"&poly_wt_4&"' ,'"&poly_code_5&"','"&poly_wt_5&"','"&poly_code_6&"','"&poly_wt_6&"', '"&delayed_chem_code_1&"' "&_
",'"&delayed_chem_wt_1&"', '"&total_wt&"')"

    ' Execute SQL
    Set cmd = CreateObject("ADODB.Command")
    Set cmd.ActiveConnection = conn
    cmd.CommandText = sql
    cmd.Execute

    If Err.Number <> 0 Then
        HMIRuntime.Tags("QUERY_STATUS").Write "SQL Execution error: " & Err.Description
        Err.Clear
        conn.Close
        Set cmd = Nothing
        Set conn = Nothing
        Exit Sub
    End If
    
    ' Success message
    HMIRuntime.Tags("QUERY_STATUS").Write 10

    ' Cleanup
    conn.Close
    Set cmd = Nothing
    Set conn = Nothing
    Else
    End if

End Sub