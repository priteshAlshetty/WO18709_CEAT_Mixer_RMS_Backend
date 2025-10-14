

Dim sSelectRecipe,sBatchNo,sSequence_wise_run_bit
Dim VAL_RECWGHREV

Dim VAL_BIN
Dim TCon
Dim Trec, Trec1, Trec2, Trec3,Trec4,Trec5,Trec6,Trec7,Trec8,Trec101
Dim CB_ActionName,CB_ActionNo
Dim sSql1, sSql2, sSql3, sSql4,sSql5,sSql6,sSql7,sSql8,sSql101
Dim k,l,m,n,o,p,q,r
Dim j,i,Seq,seq1
Dim sTime,sTemp,sKwh,sPower,sRam,sRpm
Dim CBId,CBAct,CBMaterName,CBMaterCode,CBSet,CBTol
Dim PDId,PDAct,PDMaterName,PDMaterCode,PDSet,PDTol
Dim FLId,FLMaterName,FLMaterCode,FLSet,FLTol
Dim OilAId,OilAAct,OilAMaterName,OilAMaterCode,OilASet,OilATol
Dim OilBId,OilBAct,OilBMaterName,OilBMaterCode,OilBSet,OilBTol
Dim PolyId,PolyMaterName,PolyMaterCode,PolySet,PolyTol,PolySort

Sub Run_Recipe()
HMIRuntime.Tags("Download_Progress_Bar").write 0 
HMIRuntime.Tags("Download_Progress_Popup").write 1
HMIRuntime.Tags("Download_Progress_Bar").write 200
Call Test()
						Dim dteWait1
						dteWait1 = DateAdd("s",1, Now())
						Do Until (Now() > dteWait1)
						Loop
'Msgbox("0")
HMIRuntime.Tags("Download_Progress_Bar").write 800

sSequence_wise_run_bit = HMIRuntime.Tags("Sequence_wise_run_bit").Read 

'Msgbox(sSequence_wise_run_bit)
'Msgbox("1.1")
Select Case sSequence_wise_run_bit

Case 1
'Msgbox("100.1")
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_1_recipe_name").Read 
	'Msgbox(sSelectRecipe)
	sBatchNo = HMIRuntime.Tags("PLC_Seq_1_batches").Read 
'Msgbox("100.2")

Case 2
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_2_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_2_batches").Read 
	
Case 3
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_3_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_3_batches").Read 
	
Case 4
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_4_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_4_batches").Read 
	
Case 5
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_5_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_5_batches").Read 
	
Case 6
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_6_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_6_batches").Read 
	
Case 7
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_7_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_7_batches").Read 

Case 8
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_8_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_8_batches").Read 
	
Case 9
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_9_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_9_batches").Read 
	
Case 10
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_10_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_10_batches").Read 
	
Case 11
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_11_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_11_batches").Read 
'Msgbox("2")
Case 12
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_12_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_12_batches").Read 
	
Case 13
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_13_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_13_batches").Read 
	
Case 14
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_14_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_14_batches").Read 
	
Case 15
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_15_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_15_batches").Read 
	
Case 16
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_16_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_16_batches").Read 
	
Case 17
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_17_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_17_batches").Read 

Case 18
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_18_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_18_batches").Read 
	
Case 19
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_19_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_19_batches").Read 
	
Case 20
	sSelectRecipe = HMIRuntime.Tags("PLC_Seq_20_recipe_name").Read 
	sBatchNo = HMIRuntime.Tags("PLC_Seq_20_batches").Read

Case Else
	sSelectRecipe = ""
	sBatchNo = 0
	
End Select

'Pass Recipe Name and Batch Number To PLC

'HMIRuntime.Tags("Recipe_name_plc").Write sSelectRecipe
HMIRuntime.Tags("Running_Recipe").Write sSelectRecipe
'HMIRuntime.Tags("Recipe_Block_Recipe_from_Scada_recipe_name").Write sSelectRecipe
HMIRuntime.Tags("Mixer_Set_Batch").Write sBatchNo
HMIRuntime.Tags("Mixer_Set_Batch_new").Write sBatchNo
'AS PER REQUIRTMENT OF SONAR SIR MOVE SET BATCH IN 2 TAG 

HMIRuntime.Tags("CarbonSetBatch").Write sBatchNo
HMIRuntime.Tags("OilSetBatch").Write sBatchNo

Set TCon = CreateObject("ADODB.Connection")
'TCon.open "Provider=MSDASQL.1;Persist Security Info=False;Data Source=Banbury;UID=sa;PWD=adminadmin;Initial Catalog=NewBanburryDb"
TCon.open "Provider=MSDASQL.1;Persist Security Info=False;Data Source=Banbury;Initial Catalog=NewBanburryDb"
Set Trec7 = CreateObject("ADODB.Recordset")
sSql7= "select * FROM tblMixing where RecipeIdName = '"& sSelectRecipe &"'"
Trec7.open sSql7,TCon

'Msgbox(sSelectRecipe)

HMIRuntime.Tags("INT_Sequence_no_1").Write Trec7(1)
HMIRuntime.Tags("INT_Sequence_no_2").Write Trec7(2)
HMIRuntime.Tags("INT_Sequence_no_3").Write Trec7(3)
HMIRuntime.Tags("INT_Sequence_no_4").Write Trec7(4)
HMIRuntime.Tags("INT_Sequence_no_5").Write Trec7(5)
HMIRuntime.Tags("INT_Sequence_no_6").Write Trec7(6)
HMIRuntime.Tags("INT_Sequence_no_7").Write Trec7(7)
HMIRuntime.Tags("INT_Sequence_no_8").Write Trec7(8)
HMIRuntime.Tags("INT_Sequence_no_9").Write Trec7(9)
HMIRuntime.Tags("INT_Sequence_no_10").Write Trec7(10)
HMIRuntime.Tags("INT_Sequence_no_11").Write Trec7(11)
HMIRuntime.Tags("INT_Sequence_no_12").Write Trec7(12)
HMIRuntime.Tags("INT_Sequence_no_13").Write Trec7(13)
HMIRuntime.Tags("INT_Sequence_no_14").Write Trec7(14)
HMIRuntime.Tags("INT_Sequence_no_15").Write Trec7(15)
HMIRuntime.Tags("INT_Sequence_no_16").Write Trec7(16)
HMIRuntime.Tags("INT_Sequence_no_17").Write Trec7(17)
HMIRuntime.Tags("INT_Sequence_no_18").Write Trec7(18)
HMIRuntime.Tags("INT_Sequence_no_19").Write Trec7(19)
HMIRuntime.Tags("INT_Sequence_no_20").Write Trec7(20)
HMIRuntime.Tags("INT_Sequence_no_21").Write Trec7(21)
HMIRuntime.Tags("INT_Sequence_no_22").Write Trec7(22)
HMIRuntime.Tags("INT_Sequence_no_23").Write Trec7(23)
HMIRuntime.Tags("INT_Sequence_no_24").Write Trec7(24)
HMIRuntime.Tags("INT_Sequence_no_25").Write Trec7(25)
HMIRuntime.Tags("INT_Sequence_no_26").Write Trec7(26)
HMIRuntime.Tags("INT_Sequence_no_27").Write Trec7(27)
HMIRuntime.Tags("INT_Sequence_no_28").Write Trec7(28)
HMIRuntime.Tags("INT_Sequence_no_29").Write Trec7(29)
HMIRuntime.Tags("INT_Sequence_no_30").Write Trec7(30)


HMIRuntime.Tags("INT_mode_no_2").Write Trec7(32)
HMIRuntime.Tags("INT_mode_no_3").Write Trec7(33)
HMIRuntime.Tags("INT_mode_no_4").Write Trec7(34)
HMIRuntime.Tags("INT_mode_no_5").Write Trec7(35)
HMIRuntime.Tags("INT_mode_no_6").Write Trec7(36)
HMIRuntime.Tags("INT_mode_no_7").Write Trec7(37)
HMIRuntime.Tags("INT_mode_no_8").Write Trec7(38)
HMIRuntime.Tags("INT_mode_no_9").Write Trec7(39)
HMIRuntime.Tags("INT_mode_no_10").Write Trec7(40)
HMIRuntime.Tags("INT_mode_no_11").Write Trec7(41)
HMIRuntime.Tags("INT_mode_no_12").Write Trec7(42)
HMIRuntime.Tags("INT_mode_no_13").Write Trec7(43)
HMIRuntime.Tags("INT_mode_no_14").Write Trec7(44)
HMIRuntime.Tags("INT_mode_no_15").Write Trec7(45)
HMIRuntime.Tags("INT_mode_no_16").Write Trec7(46)
HMIRuntime.Tags("INT_mode_no_17").Write Trec7(47)
HMIRuntime.Tags("INT_mode_no_18").Write Trec7(48)
HMIRuntime.Tags("INT_mode_no_19").Write Trec7(49)
HMIRuntime.Tags("INT_mode_no_20").Write Trec7(50)
HMIRuntime.Tags("INT_mode_no_21").Write Trec7(51)
HMIRuntime.Tags("INT_mode_no_22").Write Trec7(52)
HMIRuntime.Tags("INT_mode_no_23").Write Trec7(53)
HMIRuntime.Tags("INT_mode_no_24").Write Trec7(54)
HMIRuntime.Tags("INT_mode_no_25").Write Trec7(55)
HMIRuntime.Tags("INT_mode_no_26").Write Trec7(56)
HMIRuntime.Tags("INT_mode_no_27").Write Trec7(57)
HMIRuntime.Tags("INT_mode_no_28").Write Trec7(58)
HMIRuntime.Tags("INT_mode_no_29").Write Trec7(59)
HMIRuntime.Tags("INT_mode_no_30").Write Trec7(60)

HMIRuntime.Tags("INT_set_time_2").Write Trec7(62)
HMIRuntime.Tags("INT_set_time_3").Write Trec7(63)
HMIRuntime.Tags("INT_set_time_4").Write Trec7(64)
HMIRuntime.Tags("INT_set_time_5").Write Trec7(65)
HMIRuntime.Tags("INT_set_time_6").Write Trec7(66)
HMIRuntime.Tags("INT_set_time_7").Write Trec7(67)
HMIRuntime.Tags("INT_set_time_8").Write Trec7(68)
HMIRuntime.Tags("INT_set_time_9").Write Trec7(69)
HMIRuntime.Tags("INT_set_time_10").Write Trec7(70)
HMIRuntime.Tags("INT_set_time_11").Write Trec7(71)
HMIRuntime.Tags("INT_set_time_12").Write Trec7(72)
HMIRuntime.Tags("INT_set_time_13").Write Trec7(73)
HMIRuntime.Tags("INT_set_time_14").Write Trec7(74)
HMIRuntime.Tags("INT_set_time_15").Write Trec7(75)
HMIRuntime.Tags("INT_set_time_16").Write Trec7(76)
HMIRuntime.Tags("INT_set_time_17").Write Trec7(77)
HMIRuntime.Tags("INT_set_time_18").Write Trec7(78)
HMIRuntime.Tags("INT_set_time_19").Write Trec7(79)
HMIRuntime.Tags("INT_set_time_20").Write Trec7(80)
HMIRuntime.Tags("INT_set_time_21").Write Trec7(81)
HMIRuntime.Tags("INT_set_time_22").Write Trec7(82)
HMIRuntime.Tags("INT_set_time_23").Write Trec7(83)
HMIRuntime.Tags("INT_set_time_24").Write Trec7(84)
HMIRuntime.Tags("INT_set_time_25").Write Trec7(85)
HMIRuntime.Tags("INT_set_time_26").Write Trec7(86)
HMIRuntime.Tags("INT_set_time_27").Write Trec7(87)
HMIRuntime.Tags("INT_set_time_28").Write Trec7(88)
HMIRuntime.Tags("INT_set_time_29").Write Trec7(89)
HMIRuntime.Tags("INT_set_time_30").Write Trec7(90)

HMIRuntime.Tags("INT_set_temp_2").Write Trec7(92)
HMIRuntime.Tags("INT_set_temp_3").Write Trec7(93)
HMIRuntime.Tags("INT_set_temp_4").Write Trec7(94)
HMIRuntime.Tags("INT_set_temp_5").Write Trec7(95)
HMIRuntime.Tags("INT_set_temp_6").Write Trec7(96)
HMIRuntime.Tags("INT_set_temp_7").Write Trec7(97)
HMIRuntime.Tags("INT_set_temp_8").Write Trec7(98)
HMIRuntime.Tags("INT_set_temp_9").Write Trec7(99)
HMIRuntime.Tags("INT_set_temp_10").Write Trec7(100)
HMIRuntime.Tags("INT_set_temp_11").Write Trec7(101)
HMIRuntime.Tags("INT_set_temp_12").Write Trec7(102)
HMIRuntime.Tags("INT_set_temp_13").Write Trec7(103)
HMIRuntime.Tags("INT_set_temp_14").Write Trec7(104)
HMIRuntime.Tags("INT_set_temp_15").Write Trec7(105)
HMIRuntime.Tags("INT_set_temp_16").Write Trec7(106)
HMIRuntime.Tags("INT_set_temp_17").Write Trec7(107)
HMIRuntime.Tags("INT_set_temp_18").Write Trec7(108)
HMIRuntime.Tags("INT_set_temp_19").Write Trec7(109)
HMIRuntime.Tags("INT_set_temp_20").Write Trec7(110)
HMIRuntime.Tags("INT_set_temp_21").Write Trec7(111)
HMIRuntime.Tags("INT_set_temp_22").Write Trec7(112)
HMIRuntime.Tags("INT_set_temp_23").Write Trec7(113)
HMIRuntime.Tags("INT_set_temp_24").Write Trec7(114)
HMIRuntime.Tags("INT_set_temp_25").Write Trec7(115)
HMIRuntime.Tags("INT_set_temp_26").Write Trec7(116)
HMIRuntime.Tags("INT_set_temp_27").Write Trec7(117)
HMIRuntime.Tags("INT_set_temp_28").Write Trec7(118)
HMIRuntime.Tags("INT_set_temp_29").Write Trec7(119)
HMIRuntime.Tags("INT_set_temp_30").Write Trec7(120)

Dim sSet_temp,sSet_temp_New
For i=1 To 30
'Msgbox(i)
	sSet_temp=0
	sSet_temp_New=0
	sSet_temp = HMIRuntime.Tags("INT_set_temp_"& i &"").Read 
	If sSet_temp <> "" Then
		sSet_temp_New=sSet_temp*10	
		HMIRuntime.Tags("INT_set_temp_"& i &"").Write sSet_temp_New
	Else
		HMIRuntime.Tags("INT_set_temp_"& i &"").Write 0
	End If
Next

HMIRuntime.Tags("INT_set_kwh_1").Write Trec7(151)
HMIRuntime.Tags("INT_set_kwh_2").Write Trec7(152)
HMIRuntime.Tags("INT_set_kwh_3").Write Trec7(153)
HMIRuntime.Tags("INT_set_kwh_4").Write Trec7(154)
HMIRuntime.Tags("INT_set_kwh_5").Write Trec7(155)
HMIRuntime.Tags("INT_set_kwh_6").Write Trec7(156)
HMIRuntime.Tags("INT_set_kwh_7").Write Trec7(157)
HMIRuntime.Tags("INT_set_kwh_8").Write Trec7(158)
HMIRuntime.Tags("INT_set_kwh_9").Write Trec7(159)
HMIRuntime.Tags("INT_set_kwh_10").Write Trec7(160)
HMIRuntime.Tags("INT_set_kwh_11").Write Trec7(161)
HMIRuntime.Tags("INT_set_kwh_12").Write Trec7(162)
HMIRuntime.Tags("INT_set_kwh_13").Write Trec7(163)
HMIRuntime.Tags("INT_set_kwh_14").Write Trec7(164)
HMIRuntime.Tags("INT_set_kwh_15").Write Trec7(165)
HMIRuntime.Tags("INT_set_kwh_16").Write Trec7(166)
HMIRuntime.Tags("INT_set_kwh_17").Write Trec7(167)
HMIRuntime.Tags("INT_set_kwh_18").Write Trec7(168)
HMIRuntime.Tags("INT_set_kwh_19").Write Trec7(169)
HMIRuntime.Tags("INT_set_kwh_20").Write Trec7(170)
HMIRuntime.Tags("INT_set_kwh_21").Write Trec7(171)
HMIRuntime.Tags("INT_set_kwh_22").Write Trec7(172)
HMIRuntime.Tags("INT_set_kwh_23").Write Trec7(173)
HMIRuntime.Tags("INT_set_kwh_24").Write Trec7(174)
HMIRuntime.Tags("INT_set_kwh_25").Write Trec7(175)
HMIRuntime.Tags("INT_set_kwh_26").Write Trec7(176)
HMIRuntime.Tags("INT_set_kwh_27").Write Trec7(177)
HMIRuntime.Tags("INT_set_kwh_28").Write Trec7(178)
HMIRuntime.Tags("INT_set_kwh_29").Write Trec7(179)
HMIRuntime.Tags("INT_set_kwh_30").Write Trec7(180)

Dim sSet_kwh,sSet_kwh_New
For i=1 To 30
'Msgbox(i)
	sSet_kwh=0
	sSet_kwh_New=0
	sSet_kwh = HMIRuntime.Tags("INT_set_kwh_"& i &"").Read 
	If sSet_kwh <> "" Then
		sSet_kwh_New=sSet_kwh*10	
		HMIRuntime.Tags("INT_set_kwh_"& i &"").Write sSet_kwh_New
	Else
		HMIRuntime.Tags("INT_set_kwh_"& i &"").Write 0
	End If
Next


HMIRuntime.Tags("INT_set_power_1").Write Trec7(121)
HMIRuntime.Tags("INT_set_power_2").Write Trec7(122)
HMIRuntime.Tags("INT_set_power_3").Write Trec7(123)
HMIRuntime.Tags("INT_set_power_4").Write Trec7(124)
HMIRuntime.Tags("INT_set_power_5").Write Trec7(125)
HMIRuntime.Tags("INT_set_power_6").Write Trec7(126)
HMIRuntime.Tags("INT_set_power_7").Write Trec7(127)
HMIRuntime.Tags("INT_set_power_8").Write Trec7(128)
HMIRuntime.Tags("INT_set_power_9").Write Trec7(129)
HMIRuntime.Tags("INT_set_power_10").Write Trec7(130)
HMIRuntime.Tags("INT_set_power_11").Write Trec7(131)
HMIRuntime.Tags("INT_set_power_12").Write Trec7(132)
HMIRuntime.Tags("INT_set_power_13").Write Trec7(133)
HMIRuntime.Tags("INT_set_power_14").Write Trec7(134)
HMIRuntime.Tags("INT_set_power_15").Write Trec7(135)
HMIRuntime.Tags("INT_set_power_16").Write Trec7(136)
HMIRuntime.Tags("INT_set_power_17").Write Trec7(137)
HMIRuntime.Tags("INT_set_power_18").Write Trec7(138)
HMIRuntime.Tags("INT_set_power_19").Write Trec7(139)
HMIRuntime.Tags("INT_set_power_20").Write Trec7(140)
HMIRuntime.Tags("INT_set_power_21").Write Trec7(141)
HMIRuntime.Tags("INT_set_power_22").Write Trec7(142)
HMIRuntime.Tags("INT_set_power_23").Write Trec7(143)
HMIRuntime.Tags("INT_set_power_24").Write Trec7(144)
HMIRuntime.Tags("INT_set_power_25").Write Trec7(145)
HMIRuntime.Tags("INT_set_power_26").Write Trec7(146)
HMIRuntime.Tags("INT_set_power_27").Write Trec7(147)
HMIRuntime.Tags("INT_set_power_28").Write Trec7(148)
HMIRuntime.Tags("INT_set_power_29").Write Trec7(149)
HMIRuntime.Tags("INT_set_power_30").Write Trec7(150)

HMIRuntime.Tags("INT_ACTION_1").Write Trec7(181)
HMIRuntime.Tags("INT_ACTION_2").Write Trec7(182)
HMIRuntime.Tags("INT_ACTION_3").Write Trec7(183)
HMIRuntime.Tags("INT_ACTION_4").Write Trec7(184)
HMIRuntime.Tags("INT_ACTION_5").Write Trec7(185)
HMIRuntime.Tags("INT_ACTION_6").Write Trec7(186)
HMIRuntime.Tags("INT_ACTION_7").Write Trec7(187)
HMIRuntime.Tags("INT_ACTION_8").Write Trec7(188)
HMIRuntime.Tags("INT_ACTION_9").Write Trec7(189)
HMIRuntime.Tags("INT_ACTION_10").Write Trec7(190)
HMIRuntime.Tags("INT_ACTION_11").Write Trec7(191)
HMIRuntime.Tags("INT_ACTION_12").Write Trec7(192)
HMIRuntime.Tags("INT_ACTION_13").Write Trec7(193)
HMIRuntime.Tags("INT_ACTION_14").Write Trec7(194)
HMIRuntime.Tags("INT_ACTION_15").Write Trec7(195)
HMIRuntime.Tags("INT_ACTION_16").Write Trec7(196)
HMIRuntime.Tags("INT_ACTION_17").Write Trec7(197)
HMIRuntime.Tags("INT_ACTION_18").Write Trec7(198)
HMIRuntime.Tags("INT_ACTION_19").Write Trec7(199)
HMIRuntime.Tags("INT_ACTION_20").Write Trec7(200)
HMIRuntime.Tags("INT_ACTION_21").Write Trec7(201)
HMIRuntime.Tags("INT_ACTION_22").Write Trec7(202)
HMIRuntime.Tags("INT_ACTION_23").Write Trec7(203)
HMIRuntime.Tags("INT_ACTION_24").Write Trec7(204)
HMIRuntime.Tags("INT_ACTION_25").Write Trec7(205)
HMIRuntime.Tags("INT_ACTION_26").Write Trec7(206)
HMIRuntime.Tags("INT_ACTION_27").Write Trec7(207)
HMIRuntime.Tags("INT_ACTION_28").Write Trec7(208)
HMIRuntime.Tags("INT_ACTION_29").Write Trec7(209)
HMIRuntime.Tags("INT_ACTION_30").Write Trec7(210)

HMIRuntime.Tags("INT_set_ram_1").Write Trec7(211)
HMIRuntime.Tags("INT_set_ram_2").Write Trec7(212)
HMIRuntime.Tags("INT_set_ram_3").Write Trec7(213)
HMIRuntime.Tags("INT_set_ram_4").Write Trec7(214)
HMIRuntime.Tags("INT_set_ram_5").Write Trec7(215)
HMIRuntime.Tags("INT_set_ram_6").Write Trec7(216)
HMIRuntime.Tags("INT_set_ram_7").Write Trec7(217)
HMIRuntime.Tags("INT_set_ram_8").Write Trec7(218)
HMIRuntime.Tags("INT_set_ram_9").Write Trec7(219)
HMIRuntime.Tags("INT_set_ram_10").Write Trec7(220)
HMIRuntime.Tags("INT_set_ram_11").Write Trec7(221)
HMIRuntime.Tags("INT_set_ram_12").Write Trec7(222)
HMIRuntime.Tags("INT_set_ram_13").Write Trec7(223)
HMIRuntime.Tags("INT_set_ram_14").Write Trec7(224)
HMIRuntime.Tags("INT_set_ram_15").Write Trec7(225)
HMIRuntime.Tags("INT_set_ram_16").Write Trec7(226)
HMIRuntime.Tags("INT_set_ram_17").Write Trec7(227)
HMIRuntime.Tags("INT_set_ram_18").Write Trec7(228)
HMIRuntime.Tags("INT_set_ram_19").Write Trec7(229)
HMIRuntime.Tags("INT_set_ram_20").Write Trec7(230)
HMIRuntime.Tags("INT_set_ram_21").Write Trec7(231)
HMIRuntime.Tags("INT_set_ram_22").Write Trec7(232)
HMIRuntime.Tags("INT_set_ram_23").Write Trec7(233)
HMIRuntime.Tags("INT_set_ram_24").Write Trec7(234)
HMIRuntime.Tags("INT_set_ram_25").Write Trec7(235)
HMIRuntime.Tags("INT_set_ram_26").Write Trec7(236)
HMIRuntime.Tags("INT_set_ram_27").Write Trec7(237)
HMIRuntime.Tags("INT_set_ram_28").Write Trec7(238)
HMIRuntime.Tags("INT_set_ram_29").Write Trec7(239)
HMIRuntime.Tags("INT_set_ram_30").Write Trec7(240)


HMIRuntime.Tags("INT_set_rpm_1").Write Trec7(241)
HMIRuntime.Tags("INT_set_rpm_2").Write Trec7(242)
HMIRuntime.Tags("INT_set_rpm_3").Write Trec7(243)
HMIRuntime.Tags("INT_set_rpm_4").Write Trec7(244)
HMIRuntime.Tags("INT_set_rpm_5").Write Trec7(245)
HMIRuntime.Tags("INT_set_rpm_6").Write Trec7(246)
HMIRuntime.Tags("INT_set_rpm_7").Write Trec7(247)
HMIRuntime.Tags("INT_set_rpm_8").Write Trec7(248)
HMIRuntime.Tags("INT_set_rpm_9").Write Trec7(249)
HMIRuntime.Tags("INT_set_rpm_10").Write Trec7(250)
HMIRuntime.Tags("INT_set_rpm_11").Write Trec7(251)
HMIRuntime.Tags("INT_set_rpm_12").Write Trec7(252)
HMIRuntime.Tags("INT_set_rpm_13").Write Trec7(253)
HMIRuntime.Tags("INT_set_rpm_14").Write Trec7(254)
HMIRuntime.Tags("INT_set_rpm_15").Write Trec7(255)
HMIRuntime.Tags("INT_set_rpm_16").Write Trec7(256)
HMIRuntime.Tags("INT_set_rpm_17").Write Trec7(257)
HMIRuntime.Tags("INT_set_rpm_18").Write Trec7(258)
HMIRuntime.Tags("INT_set_rpm_19").Write Trec7(259)
HMIRuntime.Tags("INT_set_rpm_20").Write Trec7(260)
HMIRuntime.Tags("INT_set_rpm_21").Write Trec7(261)
HMIRuntime.Tags("INT_set_rpm_22").Write Trec7(262)
HMIRuntime.Tags("INT_set_rpm_23").Write Trec7(263)
HMIRuntime.Tags("INT_set_rpm_24").Write Trec7(264)
HMIRuntime.Tags("INT_set_rpm_25").Write Trec7(265)
HMIRuntime.Tags("INT_set_rpm_26").Write Trec7(266)
HMIRuntime.Tags("INT_set_rpm_27").Write Trec7(267)
HMIRuntime.Tags("INT_set_rpm_28").Write Trec7(268)
HMIRuntime.Tags("INT_set_rpm_29").Write Trec7(269)
HMIRuntime.Tags("INT_set_rpm_30").Write Trec7(270)

Set Trec7 = Nothing
Set TCon = Nothing

For i=2 To 30
 	HMIRuntime.Tags("INT_Track_mode_no_"& i &"").Write HMIRuntime.Tags("INT_mode_no_"& i &"").Read   'INT_mode_no_
Next
 	
For j=1 To 30

Seq = HMIRuntime.Tags("INT_ACTION_" & j & "").Read
'Sleepms(100)
'Msgbox(j)
'Msgbox(Seq)
Select Case Seq

Case "Null Mode" 
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 0
Case "Add Poly" 
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 1
Case "Add Carbon"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 2
Case "Add Oil1"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 4
Case "Open Discharge Door"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 8
Case "Close Discharge Door"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 16
Case "Ram Up"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 32
Case "Ram Up & Discharge Door Open"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 40
Case "Add Oil2"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 64
Case "Ram Down"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 128
Case "Ram Up Middle"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 256
Case "Ram Up Middle And Add Oil"
									'HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 260
Case "keeping"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 512
Case "Open Feed Door"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 1024
Case "Close Discharge Door & Open Feed Door"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 1040
Case "Close Feed Door"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 2048
Case "Add Chemical"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 4096	
Case "Ram Float"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 8192	
Case "Ram Float And Open Discharge Door"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 8200									
Case "Add WF"
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 16384																																																																														
Case Else
									HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Write 0		
End Select
Next
'Msgbox("Hello")
'Dim Seq1,i
						Dim dteWait
						dteWait = DateAdd("s",1, Now())
						Do Until (Now() > dteWait)
						Loop


For j=1 To 30
Seq1 = HMIRuntime.Tags("INT_mode_no_" & j &"").Read
'Msgbox(Seq1)
'Msgbox("*****Seq1*******")
Select Case Seq1
	
Case "Null Mode"
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 0
Case "Time"
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 1
Case "Temp"
						'Msgbox("Temp")
						
						'HMIRuntime.Tags("temp").Write 222
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 2
Case "Time or Temp"
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 3						
Case "Energy"
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 4
Case "Time AND Temp"
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 8
Case "Time AND Energy"
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 16
Case "Tem And Energy"
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 32
Case "(Time Or Temp)And EG"
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 64
Case "(Time Or EG)And Temp"
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 128
Case "(Temp Or EG)And Time"
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 256
Case "TimeAndTempAndEnergy"
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 512
Case "SimultaneityExecute"
						' Msgbox("SimultaneityExecute")
						 HMIRuntime.Tags("Simultaneity_val_1").write 0
						 HMIRuntime.Tags("Simultaneity_val_2").write 0
						Dim s1,s2,k,val1,val2,stotal,spreviousAction_No,i
						'Sleep(2000)
						'Msgbox("value of j=")
						'Dim dteWait
						dteWait = DateAdd("s",1, Now())
						Do Until (Now() > dteWait)
						Loop
						'Msgbox(j)
						spreviousAction_No= j-1
						'i= j-1
						'Msgbox(spreviousAction_No)
						s1=HMIRuntime.Tags("Track_mixing_action_number_" & j &"").Read
						'Msgbox("s1")
						'Msgbox(s1)
						s2=HMIRuntime.Tags("Track_mixing_action_number_" & spreviousAction_No &"").Read
						'Msgbox(s2)
						'************
						For k=1 To 2
						    Set TCon = CreateObject("ADODB.Connection")
						    TCon.open "Provider=MSDASQL.1;Persist Security Info=False;Data Source=Banbury;Initial Catalog=NewBanburryDb"						
							Set Trec101 = CreateObject("ADODB.Recordset")
							If k=1 Then
								sSql101="select act_addr FROM pmt_act where act_addr = '"& s1 &"'"
							Else 
								sSql101="select act_addr FROM pmt_act where act_addr = '"& s2 &"'"
							End If 
							'Msgbox(sSql101)
							Trec101.open sSql101,TCon
							HMIRuntime.Tags("Simultaneity_val_"& k &"").Write Trec101(0)
							Set Trec101 = Nothing
							Set TCon = Nothing
						Next 
						val1=HMIRuntime.Tags("Simultaneity_val_1").read
						val2=HMIRuntime.Tags("Simultaneity_val_2").read
						stotal=val1+val2
						'Msgbox("val1")
						'Msgbox(val1)
						'Msgbox("val2")
						'Msgbox(val2)
						'Msgbox("stotal")
						'Msgbox(stotal)
						
						'Msgbox("spreviousAction_No")
						'Msgbox(spreviousAction_No)
						'********************
						
						HMIRuntime.Tags("Track_mixing_action_number_" & spreviousAction_No &"").Write stotal
						
						'HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 1024
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 0
						
						''j=j+1
						''**********************code value move to previous value start
						''HMIRuntime.Tags("simteniouly_counter").read
						''Msgbox("J value")
						''Msgbox(j)
						Dim p,q,r
						For i=j To 20
								p=i
							''	'Msgbox("P value")
							''	'Msgbox(p)
								q=p
								
								q=q+1
								''Msgbox("q value")
								''Msgbox(q)
							HMIRuntime.Tags("Track_mixing_action_number_"& p &"").write HMIRuntime.Tags("Track_mixing_action_number_"& q &"").read
							HMIRuntime.Tags("INT_mode_no_"& p &"").write HMIRuntime.Tags("INT_mode_no_"& q &"").read
							HMIRuntime.Tags("INT_set_time_"& p &"").write HMIRuntime.Tags("INT_set_time_"& q &"").read
							HMIRuntime.Tags("INT_set_kwh_"& p &"").write HMIRuntime.Tags("INT_set_kwh_"& q &"").read
							HMIRuntime.Tags("INT_set_ram_"& p &"").write HMIRuntime.Tags("INT_set_ram_"& q &"").read
							HMIRuntime.Tags("INT_set_rpm_"& p &"").write HMIRuntime.Tags("INT_set_rpm_"& q &"").read
							HMIRuntime.Tags("INT_set_temp_"& p &"").write HMIRuntime.Tags("INT_set_temp_"& q &"").read
							
						Next	
					
						'**********************code value move to previous value end
Case "Recipe Finish"
						'Msgbox("Recipe Finish")
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 2048
Case Else
						'Msgbox("Case Else")
						HMIRuntime.Tags("Track_Mixing_Mode_number_"& j &"").Write 0
End Select
Next
'Msgbox("hi Dear")
For i=1 To 30
 	HMIRuntime.Tags("PLC_mixing_set_time_"& i &"").Write HMIRuntime.Tags("INT_set_time_"& i &"").Read   'Time
	HMIRuntime.Tags("PLC_mixing_set_temp_"& i &"").Write HMIRuntime.Tags("INT_set_temp_"& i &"").Read   'Temp
 	HMIRuntime.Tags("PLC_mixing_set_Power_"& i &"").Write HMIRuntime.Tags("INT_set_power_"& i &"").Read  'Power=Kw
 	HMIRuntime.Tags("PLC_mixing_set_KWh_"& i &"").Write HMIRuntime.Tags("INT_set_kwh_"& i &"").Read   'Energy=KWh
 	HMIRuntime.Tags("PLC_mixing_ram_pr_"& i &"").Write HMIRuntime.Tags("INT_set_ram_"& i &"").Read   'Ram PR.
 	HMIRuntime.Tags("PLC_mixing_rpm_"& i &"").Write HMIRuntime.Tags("INT_set_rpm_"& i &"").Read   'RPM
Next


HMIRuntime.Tags("Download_Progress_Bar").write 800
''Carbon
Set TCon = CreateObject("ADODB.Connection")
TCon.open "Provider=MSDASQL.1;Persist Security Info=False;Data Source=Banbury;Initial Catalog=NewBanburryDb"
Set Trec2 = CreateObject("ADODB.Recordset")
sSql2="select * FROM tblWeighingCarbonBlack where RecipeIdName = '"& sSelectRecipe &"'"
'Msgbox(sSql2)
Trec2.open sSql2,TCon

'*************************************************************Database to Internal Tag Value Pass For CB********************************
HMIRuntime.Tags("INT_CBAct_NEW_1").Write Trec2(16)
HMIRuntime.Tags("INT_CBAct_NEW_2").Write Trec2(17)
HMIRuntime.Tags("INT_CBAct_NEW_3").Write Trec2(18)
HMIRuntime.Tags("INT_CBAct_NEW_4").Write Trec2(19)
HMIRuntime.Tags("INT_CBAct_NEW_5").Write Trec2(20)
HMIRuntime.Tags("INT_CBAct_NEW_6").Write Trec2(21)
HMIRuntime.Tags("INT_CBAct_NEW_7").Write Trec2(22)
HMIRuntime.Tags("INT_CBAct_NEW_8").Write Trec2(23)

HMIRuntime.Tags("INT_CBMstrNm_NEW_1").Write Trec2(31)
HMIRuntime.Tags("INT_CBMstrNm_NEW_2").Write Trec2(32)
HMIRuntime.Tags("INT_CBMstrNm_NEW_3").Write Trec2(33)
HMIRuntime.Tags("INT_CBMstrNm_NEW_4").Write Trec2(34)
HMIRuntime.Tags("INT_CBMstrNm_NEW_5").Write Trec2(35)
HMIRuntime.Tags("INT_CBMstrNm_NEW_6").Write Trec2(36)
HMIRuntime.Tags("INT_CBMstrNm_NEW_7").Write Trec2(37)
HMIRuntime.Tags("INT_CBMstrNm_NEW_8").Write Trec2(38)

HMIRuntime.Tags("INT_CBSet_NEW_1").Write Trec2(61) 
HMIRuntime.Tags("INT_CBSet_NEW_2").Write Trec2(62) 
HMIRuntime.Tags("INT_CBSet_NEW_3").Write Trec2(63) 
HMIRuntime.Tags("INT_CBSet_NEW_4").Write Trec2(64) 
HMIRuntime.Tags("INT_CBSet_NEW_5").Write Trec2(65) 
HMIRuntime.Tags("INT_CBSet_NEW_6").Write Trec2(66) 
HMIRuntime.Tags("INT_CBSet_NEW_7").Write Trec2(67) 
HMIRuntime.Tags("INT_CBSet_NEW_8").Write Trec2(68) 

HMIRuntime.Tags("INT_CBTol_NEW_1").Write Trec2(76)
HMIRuntime.Tags("INT_CBTol_NEW_2").Write Trec2(77)
HMIRuntime.Tags("INT_CBTol_NEW_3").Write Trec2(78)
HMIRuntime.Tags("INT_CBTol_NEW_4").Write Trec2(79)
HMIRuntime.Tags("INT_CBTol_NEW_5").Write Trec2(80)
HMIRuntime.Tags("INT_CBTol_NEW_6").Write Trec2(81)
HMIRuntime.Tags("INT_CBTol_NEW_7").Write Trec2(82)
HMIRuntime.Tags("INT_CBTol_NEW_8").Write Trec2(83)
Set Trec2 = Nothing
'***************calculate Action No From Internal Sting tag To Internal Integer tag 
Dim sCBAct,sCBAct_NEW
For i=1 To 8
	sCBAct=0
	sCBAct_NEW=0
	sCBAct_NEW = HMIRuntime.Tags("INT_CBAct_NEW_"& i &"").Read
	If sCBAct_NEW="Weigh" Then
		sCBAct="1"
	End If
	If sCBAct_NEW="WeighTo" Then
		sCBAct="2"
	End If
	If sCBAct_NEW="Discharge" Then
		sCBAct="3"
	End If
	If sCBAct_NEW="" Then
		sCBAct="0"
	End If
	HMIRuntime.Tags("INT_CBAct"& i &"").Write sCBAct
Next 
'***************calculate Tank No From Internal Sting tag To Internal Integer tag 
Dim	Trec101,sSql101,sCBMstrNm,sCBMstrNm_NEW
'Set Trec101 = CreateObject("ADODB.Recordset")
For i=1 To 8
	sCBMstrNm_NEW=0
	sCBMstrNm_NEW = HMIRuntime.Tags("INT_CBMstrNm_NEW_"& i &"").Read
	If sCBMstrNm_NEW <> "" Then
		Set Trec101 = CreateObject("ADODB.Recordset")
		sSql101="select BinId FROM pmt_material where mater_name = '"& sCBMstrNm_NEW &"' and mater_type= 'C.B.'"
		Trec101.open sSql101,TCon
		HMIRuntime.Tags("INT_CBMstrNm"& i &"").Write Trec101(0)
		Set Trec101 = Nothing
	End If	
Next
'Set Trec101 = Nothing
'***************Calculate CB Weight Float To Internal CB Weight Int 
'Msgbox("Hello")
Dim sCBSet,sCBSet_New
For i=1 To 8
'Msgbox(i)
	sCBSet=0
	sCBSet_New=0
	sCBSet = HMIRuntime.Tags("INT_CBSet_NEW_"& i &"").Read 
	If sCBSet <> "" Then
	sCBSet_New=sCBSet*100
	
		HMIRuntime.Tags("INT_CBSet"& i &"").Write sCBSet_New
	Else
		HMIRuntime.Tags("INT_CBSet"& i &"").Write 0
	End If
Next
'***************Calculate CB Tol Weight Float To Internal CB Tol Weight Integer tag 
Dim sCBTol,sCBTol_New
For i=1 To 8
	sCBTol=0
	sCBTol_New=0
	sCBTol = HMIRuntime.Tags("INT_CBTol_NEW_"& i &"").Read 
	If sCBTol <> "" Then
	sCBTol_New=sCBTol*100
	HMIRuntime.Tags("INT_CBTol"& i &"").Write sCBTol_New
	Else
	HMIRuntime.Tags("INT_CBTol"& i &"").Write 0
	End If
Next


'**************************************************************PASS CB INTERNAL TAG TO PLC TAG
For i=1 To 8
 	'Msgbox(i)
 	HMIRuntime.Tags("PLC_CB"& i &"").Write HMIRuntime.Tags("INT_CBMstrNm"& i &"").Read 'Pass tank no internal to plc
 	HMIRuntime.Tags("PLC_CBAct"& i &"").Write HMIRuntime.Tags("INT_CBAct"& i &"").Read
 	'HMIRuntime.Tags("PLC_CBMstrNm"& i &"").Write HMIRuntime.Tags("INT_CBMstrNm"& i &"").Read
 	'HMIRuntime.Tags("PLC_CBMstrCod"& i&"").Write HMIRuntime.Tags("INT_CBMstrCod"& i &"").Read
 	HMIRuntime.Tags("PLC_CBSet"& i&"").Write HMIRuntime.Tags("INT_CBSet"& i &"").Read
 	HMIRuntime.Tags("PLC_CBTol"& i&"").Write HMIRuntime.Tags("INT_CBTol"& i &"").Read
Next
'**************************************************************

Set TCon = Nothing


'Powder
Set TCon = CreateObject("ADODB.Connection")
TCon.open "Provider=MSDASQL.1;Persist Security Info=False;Data Source=Banbury;Initial Catalog=NewBanburryDb"
Set Trec2 = CreateObject("ADODB.Recordset")
Set Trec3 = CreateObject("ADODB.Recordset")
sSql3="select * FROM tblWeighingChemicalPD where RecipeIdName = '"& sSelectRecipe &"'"
Trec3.open sSql3,TCon
'*************************************************************Database to Internal Tag Value Pass For CB********************************
HMIRuntime.Tags("INT_PDAct_NEW_1").Write Trec3(16)
HMIRuntime.Tags("INT_PDAct_NEW_2").Write Trec3(17)
HMIRuntime.Tags("INT_PDAct_NEW_3").Write Trec3(18)
HMIRuntime.Tags("INT_PDAct_NEW_4").Write Trec3(19)
HMIRuntime.Tags("INT_PDAct_NEW_5").Write Trec3(20)
HMIRuntime.Tags("INT_PDAct_NEW_6").Write Trec3(21)

HMIRuntime.Tags("INT_PDMstrNm1").Write Trec3(31)
HMIRuntime.Tags("INT_PDMstrNm2").Write Trec3(32)
HMIRuntime.Tags("INT_PDMstrNm3").Write Trec3(33)
HMIRuntime.Tags("INT_PDMstrNm4").Write Trec3(34)
HMIRuntime.Tags("INT_PDMstrNm5").Write Trec3(35)
HMIRuntime.Tags("INT_PDMstrNm6").Write Trec3(36)
 
HMIRuntime.Tags("INT_PDSet_NEW_1").Write Trec3(61) 
HMIRuntime.Tags("INT_PDSet_NEW_2").Write Trec3(62) 
HMIRuntime.Tags("INT_PDSet_NEW_3").Write Trec3(63) 
HMIRuntime.Tags("INT_PDSet_NEW_4").Write Trec3(64) 
HMIRuntime.Tags("INT_PDSet_NEW_5").Write Trec3(65) 
HMIRuntime.Tags("INT_PDSet_NEW_6").Write Trec3(66)  

HMIRuntime.Tags("INT_PDTol_NEW_1").Write Trec3(76)
HMIRuntime.Tags("INT_PDTol_NEW_2").Write Trec3(77)
HMIRuntime.Tags("INT_PDTol_NEW_3").Write Trec3(78)
HMIRuntime.Tags("INT_PDTol_NEW_4").Write Trec3(79)
HMIRuntime.Tags("INT_PDTol_NEW_5").Write Trec3(80)
HMIRuntime.Tags("INT_PDTol_NEW_6").Write Trec3(81)

Set Trec3 = Nothing
'***************calculate Action No From Internal Sting tag To Internal Integer tag 
Dim sPDAct,sPDAct_NEW
For i=1 To 6
	sPDAct=0
	sPDAct_NEW=0
	sPDAct_NEW = HMIRuntime.Tags("INT_PDAct_NEW_"& i &"").Read
	If sPDAct_NEW="Weigh" Then
		sPDAct="1"
	End If
	If sPDAct_NEW="WeighTo" Then
		sPDAct="2"
	End If
	If sPDAct_NEW="Discharge" Then
		sPDAct="3"
	End If
	If sPDAct_NEW="" Then
		sPDAct="0"
	End If
	HMIRuntime.Tags("INT_PDAct"& i &"").Write sPDAct
Next 
'***************calculate Tank No From Internal Sting tag To Internal Integer tag 
Dim	sPDMstrNm,sPDMstrNm_NEW
For i=1 To 6
	sPDMstrNm_NEW=0
	sPDMstrNm_NEW = HMIRuntime.Tags("INT_PDMstrNm"& i &"").Read
	If sPDMstrNm_NEW = "" Then
		HMIRuntime.Tags("INT_PD"& i &"").Write 0 'Pass tank No 1 Because only one tank is avaliable on field 
	Else
		HMIRuntime.Tags("INT_PD"& i &"").Write 1
	End If	
Next
'***************Calculate CB Weight Float To Internal CB Weight Int 
Dim sPDSet,sPDSet_New
For i=1 To 6
	sPDSet=0
	sPDSet_New=0
	sPDSet = HMIRuntime.Tags("INT_PDSet_NEW_"& i &"").Read 
	If sPDSet <> "" Then
	sPDSet_New=sPDSet*100
	'Msgbox(sPDSet_New)
	HMIRuntime.Tags("INT_PDSet"& i &"").Write sPDSet_New
	Else
	HMIRuntime.Tags("INT_PDSet"& i &"").Write 0
	End If
Next
'***************Calculate PD Tol Weight Float To Internal PD Tol Weight Integer tag 
Dim sPDTol,sPDTol_New
For i=1 To 6
	sPDTol=0
	sPDTol_New=0
	sPDTol = HMIRuntime.Tags("INT_PDTol_NEW_"& i &"").Read 
	If sPDTol <> "" Then
	sPDTol_New=sPDTol*100
	HMIRuntime.Tags("INT_PDTol"& i &"").Write sPDTol_New
	Else
	HMIRuntime.Tags("INT_PDTol"& i &"").Write 0
	End If
Next

'**************************************************************PASS CB INTERNAL TAG TO PLC TAG
For i=1 To 6	
 	'HMIRuntime.Tags("PLC_PD"& i &"").Write HMIRuntime.Tags("INT_PD"& i &"").Read
 	HMIRuntime.Tags("PLC_PDAct"& i &"").Write HMIRuntime.Tags("INT_PDAct"& i &"").Read  
 	'HMIRuntime.Tags("PLC_PDMstrNm"& i &"").Write HMIRuntime.Tags("INT_PDMstrNm"& i &"").Read
 	'HMIRuntime.Tags("PLC_PDMstrCod"& i &"").Write HMIRuntime.Tags("INT_PDMstrCod"& i &"").Read
 	HMIRuntime.Tags("PLC_PDSet"& i &"").Write HMIRuntime.Tags("INT_PDSet"& i &"").Read
 	HMIRuntime.Tags("PLC_PDTol"& i &"").Write HMIRuntime.Tags("INT_PDTol"& i &"").Read
Next
'******************************************************************************************
'**************************************************************FL**************************

Set TCon = Nothing
'Msgbox("Filler")  
'************************* delay conveyor
Set TCon = CreateObject("ADODB.Connection")
TCon.open "Provider=MSDASQL.1;Persist Security Info=False;Data Source=Banbury;Initial Catalog=NewBanburryDb"
Set Trec4 = CreateObject("ADODB.Recordset")
sSql4="select * FROM tblWeighingFiller where RecipeIdName = '"& sSelectRecipe &"'"
Trec4.open sSql4,TCon

HMIRuntime.Tags("INT_FLMstrNm1").Write Trec4(16)
HMIRuntime.Tags("INT_FLMstrNm2").Write Trec4(17)
HMIRuntime.Tags("INT_FLMstrNm3").Write Trec4(18)
HMIRuntime.Tags("INT_FLMstrNm4").Write Trec4(19)


HMIRuntime.Tags("INT_FLSet_NEW_1").Write Trec4(46)
HMIRuntime.Tags("INT_FLSet_NEW_2").Write Trec4(47)
HMIRuntime.Tags("INT_FLSet_NEW_3").Write Trec4(48)
HMIRuntime.Tags("INT_FLSet_NEW_4").Write Trec4(49)

HMIRuntime.Tags("INT_FLTol_NEW_1").Write Trec4(61)
HMIRuntime.Tags("INT_FLTol_NEW_2").Write Trec4(62)
HMIRuntime.Tags("INT_FLTol_NEW_3").Write Trec4(63)
HMIRuntime.Tags("INT_FLTol_NEW_4").Write Trec4(64)
Set Trec4 = Nothing
'***************calculate Tank No From Internal Sting tag To Internal Integer tag 
Dim	sFLMstrNm,sFLMstrNm_NEW
For i=1 To 4
	sFLMstrNm_NEW=0
	sFLMstrNm_NEW = HMIRuntime.Tags("INT_FLMstrNm"& i &"").Read
	If sFLMstrNm_NEW = "" Then
		HMIRuntime.Tags("INT_FL"& i &"").Write 0 'Pass tank No 1 Because only one tank is avaliable on field 
	Else
		HMIRuntime.Tags("INT_FL"& i &"").Write 1
	End If	
Next

'***************Calculate FL Weight Float To Internal FL Weight Int 
Dim sFLSet,sFLSet_New
For i=1 To 4
	sFLSet=0
	sFLSet_New=0
	sFLSet = HMIRuntime.Tags("INT_FLSet_NEW_"& i &"").Read 
	If sFLSet <> "" Then
	sFLSet_New=sFLSet*100
	HMIRuntime.Tags("INT_FLSet"& i &"").Write sFLSet_New
	Else
	HMIRuntime.Tags("INT_FLSet"& i &"").Write 0
	End If
Next
'***************Calculate FL Tol Weight Float To Internal FL Tol Weight Integer tag 
Dim sFLTol,sFLTol_New
For i=1 To 1
	sFLTol=0
	sFLTol_New=0
	sFLTol = HMIRuntime.Tags("INT_FLTol_NEW_"& i &"").Read 
	If sFLTol <> "" Then
	sFLTol_New=sFLTol*100
	HMIRuntime.Tags("INT_FLTol"& i &"").Write sFLTol_New
	Else
	HMIRuntime.Tags("INT_FLTol"& i &"").Write 0
	End If
Next
'Msgbox("hi")
'**************************************PASS FL VALUE INTERNAL TO PLC TAG
For i=1 To 4
 	'HMIRuntime.Tags("PLC_FL"& i &"").Write HMIRuntime.Tags("INT_FL"& i &"").Read
 	'HMIRuntime.Tags("PLC_FLMstrCod"& i &"").Write HMIRuntime.Tags("INT_FLMstrCod"& i &"").Read
 	'HMIRuntime.Tags("PLC_FLMstrNm"& i &"").Write HMIRuntime.Tags("INT_FLMstrNm"& i &"").Read
	HMIRuntime.Tags("PLC_FLSet"& i &"").Write HMIRuntime.Tags("INT_FLSet"& i &"").Read 
 	HMIRuntime.Tags("PLC_FLTol"& i &"").Write HMIRuntime.Tags("INT_FLTol"& i &"").Read
Next
HMIRuntime.Tags("Download_Progress_Bar").write 800

Set TCon = Nothing
'Polymer
Set TCon = CreateObject("ADODB.Connection")
TCon.open "Provider=MSDASQL.1;Persist Security Info=False;Data Source=Banbury;Initial Catalog=NewBanburryDb"
'Polymer
Set Trec5 = CreateObject("ADODB.Recordset")
sSql5="select * FROM tblWeighingPoly where RecipeIdName = '"& sSelectRecipe &"'"
Trec5.open sSql5,TCon

HMIRuntime.Tags("Poly1Code").Write Trec5(16)
HMIRuntime.Tags("INT_PolyMstrNm1").Write Trec5(16)
HMIRuntime.Tags("Poly2Code").Write Trec5(17)
HMIRuntime.Tags("INT_PolyMstrNm2").Write Trec5(17)
HMIRuntime.Tags("Poly3Code").Write Trec5(18)
HMIRuntime.Tags("INT_PolyMstrNm3").Write Trec5(18)
HMIRuntime.Tags("Poly4Code").Write Trec5(19)
HMIRuntime.Tags("INT_PolyMstrNm4").Write Trec5(19)
HMIRuntime.Tags("Poly5Code").Write Trec5(20)
HMIRuntime.Tags("INT_PolyMstrNm5").Write Trec5(20)
HMIRuntime.Tags("Poly6Code").Write Trec5(21)
HMIRuntime.Tags("INT_PolyMstrNm6").Write Trec5(21)
HMIRuntime.Tags("INT_PolyMstrNm7").Write Trec5(22)
HMIRuntime.Tags("INT_PolyMstrNm7").Write Trec5(22)
HMIRuntime.Tags("INT_PolyMstrNm8").Write Trec5(23)
HMIRuntime.Tags("INT_PolyMstrNm9").Write Trec5(24)
HMIRuntime.Tags("INT_PolyMstrNm10").Write Trec5(25)
HMIRuntime.Tags("INT_PolyMstrNm11").Write Trec5(26)
HMIRuntime.Tags("INT_PolyMstrNm12").Write Trec5(27)
HMIRuntime.Tags("INT_PolyMstrNm13").Write Trec5(28)
HMIRuntime.Tags("INT_PolyMstrNm14").Write Trec5(29)
HMIRuntime.Tags("INT_PolyMstrNm15").Write Trec5(30)

HMIRuntime.Tags("INT_PolySet_NEW_1").Write Trec5(46)
HMIRuntime.Tags("INT_PolySet_NEW_2").Write Trec5(47)
HMIRuntime.Tags("INT_PolySet_NEW_3").Write Trec5(48)
HMIRuntime.Tags("INT_PolySet_NEW_4").Write Trec5(49)
HMIRuntime.Tags("INT_PolySet_NEW_5").Write Trec5(50)
HMIRuntime.Tags("INT_PolySet_NEW_6").Write Trec5(51)
HMIRuntime.Tags("INT_PolySet_NEW_7").Write Trec5(52)
HMIRuntime.Tags("INT_PolySet_NEW_8").Write Trec5(53)
HMIRuntime.Tags("INT_PolySet_NEW_9").Write Trec5(54)
HMIRuntime.Tags("INT_PolySet_NEW_10").Write Trec5(55)
HMIRuntime.Tags("INT_PolySet_NEW_11").Write Trec5(56)
HMIRuntime.Tags("INT_PolySet_NEW_12").Write Trec5(57)
HMIRuntime.Tags("INT_PolySet_NEW_13").Write Trec5(58)
HMIRuntime.Tags("INT_PolySet_NEW_14").Write Trec5(59)
HMIRuntime.Tags("INT_PolySet_NEW_15").Write Trec5(60)


HMIRuntime.Tags("INT_PolyTol_NEW_1").Write Trec5(61)
HMIRuntime.Tags("INT_PolyTol_NEW_2").Write Trec5(62)
HMIRuntime.Tags("INT_PolyTol_NEW_3").Write Trec5(63)
HMIRuntime.Tags("INT_PolyTol_NEW_4").Write Trec5(64)
HMIRuntime.Tags("INT_PolyTol_NEW_5").Write Trec5(65)
HMIRuntime.Tags("INT_PolyTol_NEW_6").Write Trec5(66)
HMIRuntime.Tags("INT_PolyTol_NEW_7").Write Trec5(67)
HMIRuntime.Tags("INT_PolyTol_NEW_8").Write Trec5(68)
HMIRuntime.Tags("INT_PolyTol_NEW_9").Write Trec5(69)
HMIRuntime.Tags("INT_PolyTol_NEW_10").Write Trec5(70)
HMIRuntime.Tags("INT_PolyTol_NEW_11").Write Trec5(71)
HMIRuntime.Tags("INT_PolyTol_NEW_12").Write Trec5(72)
HMIRuntime.Tags("INT_PolyTol_NEW_13").Write Trec5(73)
HMIRuntime.Tags("INT_PolyTol_NEW_14").Write Trec5(74)
HMIRuntime.Tags("INT_PolyTol_NEW_15").Write Trec5(75)



HMIRuntime.Tags("INT_PolySort1_new").Write Trec5(76)
HMIRuntime.Tags("INT_PolySort2_new").Write Trec5(77)
HMIRuntime.Tags("INT_PolySort3_new").Write Trec5(78)
HMIRuntime.Tags("INT_PolySort4_new").Write Trec5(79)
HMIRuntime.Tags("INT_PolySort5_new").Write Trec5(80)
HMIRuntime.Tags("INT_PolySort6_new").Write Trec5(81)
HMIRuntime.Tags("INT_PolySort7_new").Write Trec5(82)
HMIRuntime.Tags("INT_PolySort8_new").Write Trec5(83)
HMIRuntime.Tags("INT_PolySort9_new").Write Trec5(84)
HMIRuntime.Tags("INT_PolySort10_new").Write Trec5(85)
HMIRuntime.Tags("INT_PolySort11_new").Write Trec5(86)
HMIRuntime.Tags("INT_PolySort12_new").Write Trec5(87)
HMIRuntime.Tags("INT_PolySort13_new").Write Trec5(88)
HMIRuntime.Tags("INT_PolySort14_new").Write Trec5(89)
HMIRuntime.Tags("INT_PolySort15_new").Write Trec5(90)

Set Trec5 = Nothing
'***************calculate Tank No From Internal Sting tag To Internal Integer tag 
Dim	sPolyMstrNm,sPolyMstrNm_NEW
For i=1 To 15
	sPolyMstrNm_NEW=0
	sPolyMstrNm_NEW = HMIRuntime.Tags("INT_PolyMstrNm"& i &"").Read
	If sPolyMstrNm_NEW = "" Then
		HMIRuntime.Tags("INT_Poly"& i &"").Write 0 'Pass tank No 1 Because only one tank is avaliable on field 
	Else
		HMIRuntime.Tags("INT_Poly"& i &"").Write 1
	End If	
Next

'***************Calculate Poly Weight Polyoat To Internal Poly Weight Int 
Dim sPolySet,sPolySet_New
For i=1 To 15
	sPolySet=0
	sPolySet_New=0
	sPolySet = HMIRuntime.Tags("INT_PolySet_NEW_"& i &"").Read 
	'Msgbox(sPolySet)
	If sPolySet <> "" Then
	sPolySet_New=sPolySet*10
	HMIRuntime.Tags("INT_PolySet"& i &"").Write sPolySet_New
	Else
	HMIRuntime.Tags("INT_PolySet"& i &"").Write 0
	End If
Next
'***************Calculate Poly Tol Weight Polyoat To Internal Poly Tol Weight Integer tag 
Dim sPolyTol,sPolyTol_New
For i=1 To 15
	sPolyTol=0
	sPolyTol_New=0
	sPolyTol = HMIRuntime.Tags("INT_PolyTol_NEW_"& i &"").Read 
	If sPolyTol <> "" Then
	sPolyTol_New=sPolyTol*10
	HMIRuntime.Tags("INT_PolyTol"& i &"").Write sPolyTol_New
	Else
	HMIRuntime.Tags("INT_PolyTol"& i &"").Write 0
	End If
Next

Dim	sPolySort,sPolySort_NEW
For i=1 To 15
	sPolySort=0
	sPolySort_NEW = HMIRuntime.Tags("INT_PolySort"& i &"_new").Read
	If sPolySort_NEW = "Enabled" Then
		HMIRuntime.Tags("INT_PolySort"& i &"").Write 1 'Pass tank No 1 Because only one tank is avaliable on field 
	Else
		HMIRuntime.Tags("INT_PolySort"& i &"").Write 0
	End If	
Next

For i=1 To 15	
 	'HMIRuntime.Tags("PLC_Poly"& i &"").Write HMIRuntime.Tags("INT_Poly"& i).Read
 	'HMIRuntime.Tags("PLC_PolyMstrCod"& i &"").Write HMIRuntime.Tags("INT_PolyMstrCod"& i &"").Read
 	'HMIRuntime.Tags("PLC_PolyMstrNm"& i &"").Write HMIRuntime.Tags("INT_PolyMstrNm"& i &"").Read
 	
 	HMIRuntime.Tags("PLC_PolySet"& i &"").Write HMIRuntime.Tags("INT_PolySet"& i &"").Read
 	HMIRuntime.Tags("PLC_PolyTol"& i &"").Write HMIRuntime.Tags("INT_PolyTol"& i &"").Read
 	HMIRuntime.Tags("PLC_PolySort"& i &"").Write HMIRuntime.Tags("INT_PolySort"& i &"").Read
Next


Set TCon = Nothing
'********************************************************
'Oil1
Set TCon = CreateObject("ADODB.Connection")
TCon.open "Provider=MSDASQL.1;Persist Security Info=False;Data Source=Banbury;Initial Catalog=NewBanburryDb"
Set Trec6 = CreateObject("ADODB.Recordset")
sSql6="select * FROM tblWeighingOilA where RecipeIdName = '"& sSelectRecipe &"'"
Trec6.open sSql6,TCon

HMIRuntime.Tags("INT_OilAAct_NEW_1").Write Trec6(16)
HMIRuntime.Tags("INT_OilAAct_NEW_2").Write Trec6(17)
HMIRuntime.Tags("INT_OilAAct_NEW_3").Write Trec6(18)
HMIRuntime.Tags("INT_OilAAct_NEW_4").Write Trec6(19)
HMIRuntime.Tags("INT_OilAAct_NEW_5").Write Trec6(20)
HMIRuntime.Tags("INT_OilAAct_NEW_6").Write Trec6(21)
HMIRuntime.Tags("INT_OilAAct_NEW_7").Write Trec6(22)

HMIRuntime.Tags("INT_OilAMstrNm1").Write Trec6(31)
HMIRuntime.Tags("INT_OilAMstrNm2").Write Trec6(32)
HMIRuntime.Tags("INT_OilAMstrNm3").Write Trec6(33)
HMIRuntime.Tags("INT_OilAMstrNm4").Write Trec6(34)
HMIRuntime.Tags("INT_OilAMstrNm5").Write Trec6(35)
HMIRuntime.Tags("INT_OilAMstrNm6").Write Trec6(36)
HMIRuntime.Tags("INT_OilAMstrNm7").Write Trec6(37)
 
HMIRuntime.Tags("INT_OilASet_NEW_1").Write Trec6(61) 
HMIRuntime.Tags("INT_OilASet_NEW_2").Write Trec6(62) 
HMIRuntime.Tags("INT_OilASet_NEW_3").Write Trec6(63) 
HMIRuntime.Tags("INT_OilASet_NEW_4").Write Trec6(64) 
HMIRuntime.Tags("INT_OilASet_NEW_5").Write Trec6(65) 
HMIRuntime.Tags("INT_OilASet_NEW_6").Write Trec6(66) 
HMIRuntime.Tags("INT_OilASet_NEW_7").Write Trec6(67) 

HMIRuntime.Tags("INT_OilATol_NEW_1").Write Trec6(76)
HMIRuntime.Tags("INT_OilATol_NEW_2").Write Trec6(77)
HMIRuntime.Tags("INT_OilATol_NEW_3").Write Trec6(78)
HMIRuntime.Tags("INT_OilATol_NEW_4").Write Trec6(79)
HMIRuntime.Tags("INT_OilATol_NEW_5").Write Trec6(80)
HMIRuntime.Tags("INT_OilATol_NEW_6").Write Trec6(81)
HMIRuntime.Tags("INT_OilATol_NEW_7").Write Trec6(82)

Set Trec6 = Nothing

'***************calculate Action No From Internal Sting tag To Internal Integer tag 
Dim sOilAAct,sOilAAct_NEW
For i=1 To 7
	sOilAAct=0
	sOilAAct_NEW=0
	sOilAAct_NEW = HMIRuntime.Tags("INT_OilAAct_NEW_"& i &"").Read
	If sOilAAct_NEW="Weigh" Then
		sOilAAct="1"
	End If
	If sOilAAct_NEW="WeighTo" Then
		sOilAAct="2"
	End If
	If sOilAAct_NEW="Discharge" Then
		sOilAAct="3"
	End If
	If sOilAAct_NEW="" Then
		sOilAAct="0"
	End If
	HMIRuntime.Tags("INT_OilAAct"& i &"").Write sOilAAct
Next 
'***************calculate Tank No From Internal Sting tag To Internal Integer tag 
	Dim	sOilAMstrNm,sOilAMstrNm_NEW
'	For i=1 To 7
'		'sOilAMstrNm_NEW=" "
'		sOilAMstrNm_NEW = HMIRuntime.Tags("INT_OilAMstrNm"& i &"").Read
'		If sOilAMstrNm_NEW = "" Then
'			HMIRuntime.Tags("INT_OilA"& i &"").Write 0 'Pass tank No 1 Because only one tank is avaliable on field 
'		Else
'			HMIRuntime.Tags("INT_OilA"& i &"").Write 1  '1
'		End If	
'	Next
'Msgbox("hii")
For i=1 To 7
	'sOilAMstrNm_NEW=0
	sOilAMstrNm_NEW = HMIRuntime.Tags("INT_OilAMstrNm"& i &"").Read
	'Msgbox(sOilAMstrNm_NEW)
	If sOilAMstrNm_NEW <> "" Then
	'Msgbox("h*******")
		Set Trec101 = CreateObject("ADODB.Recordset")
		sSql101="select BinId FROM pmt_material where mater_name = '"& sOilAMstrNm_NEW &"' and mater_type= 'Oil1'"
		'Msgbox(sSql101)
		Trec101.open sSql101,TCon
		HMIRuntime.Tags("INT_OilA"& i &"").Write Trec101(0)
		Set Trec101 = Nothing
	End If	
Next


'Dim sOilASet,sOilASet_New
'For i=1 To 7
''Msgbox(i)
'	sOilASet=0
'	sOilASet_New=0
'	sCBSet = HMIRuntime.Tags("INT_CBSet_NEW_"& i &"").Read 
'	If sCBSet <> "" Then
'	sCBSet_New=sCBSet*100
'	
'		HMIRuntime.Tags("INT_CBSet"& i &"").Write sCBSet_New
'	Else
'		HMIRuntime.Tags("INT_CBSet"& i &"").Write 0
'	End If
'Next

'***************Calculate Oil Weight Float To Internal Oil Weight Int 
Dim sOilASet,sOilASet_New
For i=1 To 7
	sOilASet=0
	sOilASet_New=0
	sOilASet = HMIRuntime.Tags("INT_OilASet_NEW_"& i &"").Read 
	If sOilASet <> "" Then
	sOilASet_New=sOilASet*100
	HMIRuntime.Tags("INT_OilASet"& i &"").Write sOilASet_New
	Else
	HMIRuntime.Tags("INT_OilASet"& i &"").Write 0
	End If
Next
'***************Calculate OilA Tol Weight Float To Internal OilA Tol Weight Integer tag 
Dim sOilATol,sOilATol_New
For i=1 To 7
	sOilATol=0
	sOilATol_New=0
	sOilATol = HMIRuntime.Tags("INT_OilATol_NEW_"& i &"").Read 
	If sOilATol <> "" Then
	sOilATol_New=sOilATol*100
	HMIRuntime.Tags("INT_OilATol"& i &"").Write sOilATol_New
	Else
	HMIRuntime.Tags("INT_OilATol"& i &"").Write 0
	End If
Next


'**************************************************************PASS Oil INTERNAL TAG TO PLC TAG
For i=1 To 7
 	HMIRuntime.Tags("PLC_OilA"& i &"").Write HMIRuntime.Tags("INT_OilA"& i &"").Read
 	HMIRuntime.Tags("PLC_OilAAct"& i &"").Write HMIRuntime.Tags("INT_OilAAct"& i &"").Read 
 	'HMIRuntime.Tags("PLC_OilAMstrNm"& i &"").Write HMIRuntime.Tags("INT_OilAMstrNm"& i &"").Read
 	'HMIRuntime.Tags("PLC_OilAMstrCod"& i &"").Write HMIRuntime.Tags("INT_OilAMstrCod"& i &"").Read
 	HMIRuntime.Tags("PLC_OilASet"& i &"").Write HMIRuntime.Tags("INT_OilASet"& i &"").Read
 	HMIRuntime.Tags("PLC_OilATol"& i &"").Write HMIRuntime.Tags("INT_OilATol"& i &"").Read
Next

'**********************************************************************************

Set TCon = Nothing
HMIRuntime.Tags("Download_Progress_Bar").write 900

Set TCon = CreateObject("ADODB.Connection")
TCon.open "Provider=MSDASQL.1;Persist Security Info=False;Data Source=Banbury;Initial Catalog=NewBanburryDb"
Set Trec8 = CreateObject("ADODB.Recordset")
sSql8="select MaxTempOfFeed,MaxTimeOvertempDischarge,MinTimeOvertempDischarge,TempOvertempDischarg,TimeOfCBReclaim,UseThreeTMP,DischargeTMPMax,DischargeTMPMin,DischargeTIMPMax,DischargeTIMPmin,OverEnergy,TotalRubTolerance,RotorTMP,DischargeDoorTMP,MixRoomTMP,RotorTMPMinTol,RotorTMPMaxTol,DischargeDoorTMPMinTol,DischargeDoorTMPMaxTol,MixRoomTMPMinTol,MixRoomTMPMaxTol FROM tblWeighing where RecipeIdName = '"& sSelectRecipe &"'"
Trec8.open sSql8,TCon
HMIRuntime.Tags("INT_MaxTempOfFeed").Write Trec8(0)
HMIRuntime.Tags("INT_MinTimeOvertimeDischarge").Write Trec8(1)
HMIRuntime.Tags("INT_MinTimeOvertempDischarge").Write Trec8(2)
HMIRuntime.Tags("INT_TempOvertempDischarg").Write Trec8(3)
HMIRuntime.Tags("INT_TimeOfCBReclaim").Write Trec8(4)
HMIRuntime.Tags("INT_UseThreeTMP").Write Trec8(5)
HMIRuntime.Tags("INT_DischargeTMPMax").Write Trec8(6)
HMIRuntime.Tags("INT_DischargeTMPMin").Write Trec8(7)
HMIRuntime.Tags("INT_DischargeTIMEMax").Write Trec8(8)
HMIRuntime.Tags("INT_DischargeTIMEmin").Write Trec8(9)

HMIRuntime.Tags("INT_OverEnergy").Write Trec8(10)
HMIRuntime.Tags("INT_TotalRubTolerance").Write Trec8(11)

HMIRuntime.Tags("INT_RotorTMP").Write Trec8(12)
HMIRuntime.Tags("INT_DischargeDoorTMP").Write Trec8(13)
HMIRuntime.Tags("INT_MixRoomTMP").Write Trec8(14)
HMIRuntime.Tags("INT_RotorTMPMinTol").Write Trec8(15)
HMIRuntime.Tags("INT_RotorTMPMaxTol").Write Trec8(16)
HMIRuntime.Tags("INT_DischargeDoorTMPMinTol").Write Trec8(17)
HMIRuntime.Tags("INT_DischargeDoorTMPMaxTol").Write Trec8(18)
HMIRuntime.Tags("INT_MixRoomTMPMinTol").Write Trec8(19)
HMIRuntime.Tags("INT_MixRoomTMPMaxTol").Write Trec8(20)
Set Trec8 = Nothing
Set TCon = Nothing




HMIRuntime.Tags("PLC_MaxTempOfFeed").Write HMIRuntime.Tags("INT_MaxTempOfFeed").Read
HMIRuntime.Tags("PLC_MinTimeOvertimeDischarge").Write HMIRuntime.Tags("INT_MinTimeOvertimeDischarge").Read
HMIRuntime.Tags("PLC_MinTimeOvertempDischarge").Write HMIRuntime.Tags("INT_MinTimeOvertempDischarge").Read
'HMIRuntime.Tags("PLC_TempOvertempDischarg").Write HMIRuntime.Tags("INT_TempOvertempDischarg").Read
	Dim sTempOvertempDischarg,sTempOvertempDischarg_New
	sTempOvertempDischarg=0
	sTempOvertempDischarg_New=0
	sTempOvertempDischarg = HMIRuntime.Tags("INT_TempOvertempDischarg").Read 
	sTempOvertempDischarg_New=sTempOvertempDischarg*10
	HMIRuntime.Tags("PLC_TempOvertempDischarg").Write sTempOvertempDischarg_New

HMIRuntime.Tags("PLC_TimeOfCBReclaim").Write HMIRuntime.Tags("INT_TimeOfCBReclaim").Read
HMIRuntime.Tags("PLC_UseThreeTMP").Write HMIRuntime.Tags("INT_UseThreeTMP").Read
HMIRuntime.Tags("PLC_DischargeTMPMax").Write HMIRuntime.Tags("INT_DischargeTMPMax").Read
HMIRuntime.Tags("PLC_DischargeTMPMin").Write HMIRuntime.Tags("INT_DischargeTMPMin").Read
HMIRuntime.Tags("PLC_DischargeTIMEMax").Write HMIRuntime.Tags("INT_DischargeTIMEMax").Read
HMIRuntime.Tags("PLC_DischargeTIMEmin").Write HMIRuntime.Tags("INT_DischargeTIMEmin").Read
'HMIRuntime.Tags("PLC_OverEnergy").Write HMIRuntime.Tags("INT_OverEnergy").Read

	Dim sOverEnergy,sOverEnergy_New
	sOverEnergy=0
	sOverEnergy_New=0
	sOverEnergy = HMIRuntime.Tags("INT_OverEnergy").Read 
	sOverEnergy_New=sOverEnergy*10
	HMIRuntime.Tags("PLC_OverEnergy").Write sOverEnergy_New

HMIRuntime.Tags("PLC_TotalRubTolerance").Write HMIRuntime.Tags("INT_TotalRubTolerance").Read
HMIRuntime.Tags("PLC_RotorTMP").Write HMIRuntime.Tags("INT_RotorTMP").Read
HMIRuntime.Tags("PLC_DischargeDoorTMP").Write HMIRuntime.Tags("INT_DischargeDoorTMP").Read
HMIRuntime.Tags("PLC_MixRoomTMP").Write HMIRuntime.Tags("INT_MixRoomTMP").Read
HMIRuntime.Tags("PLC_RotorTMPMinTol").Write HMIRuntime.Tags("INT_RotorTMPMinTol").Read
HMIRuntime.Tags("PLC_RotorTMPMaxTol").Write HMIRuntime.Tags("INT_RotorTMPMaxTol").Read
HMIRuntime.Tags("PLC_DischargeDoorTMPMinTol").Write HMIRuntime.Tags("INT_DischargeDoorTMPMinTol").Read
HMIRuntime.Tags("PLC_DischargeDoorTMPMaxTol").Write HMIRuntime.Tags("INT_DischargeDoorTMPMaxTol").Read
HMIRuntime.Tags("PLC_MixRoomTMPMinTol").Write HMIRuntime.Tags("INT_MixRoomTMPMinTol").Read
HMIRuntime.Tags("PLC_MixRoomTMPMaxTol").Write HMIRuntime.Tags("INT_MixRoomTMPMaxTol").Read

m = 0
sTime = ""
For m=2 To 30
	sTime = HMIRuntime.Tags("I_set_time_"& m &"").read
 	HMIRuntime.Tags("PLC_mixing_set_time_"& m &"").Write sTime
Next

For n=2 To 30
	sTemp = HMIRuntime.Tags("I_set_temp_"& n &"").read
	HMIRuntime.Tags("PLC_mixing_set_temp_"& n &"").Write sTemp
Next

For o=2 To 30
	sKwh =HMIRuntime.Tags("I_set_kwh_"& o &"").read
	HMIRuntime.Tags("PLC_mixing_set_KWh_"& o &"").Write sKwh
Next

For p=2 To 30
	sPower= HMIRuntime.Tags("I_set_power_"& p &"").read
	HMIRuntime.Tags("PLC_mixing_set_Power_"& p &"").Write sPower
Next
For q=1 To 30
	sRam =HMIRuntime.Tags("I_set_ram_"& q &"").read
	HMIRuntime.Tags("PLC_mixing_ram_pr_"& q &"").Write sRam
Next
For r=1 To 30
	sRpm=HMIRuntime.Tags("I_set_rpm_"& r &"").read
	HMIRuntime.Tags("PLC_mixing_rpm_"& r &"").Write sRpm
Next


'Msgbox("Before")
HMIRuntime.Tags("PLC_Batch_Load_Bit").Write 1
HMIRuntime.Tags("PLC_Mixer_Start_Bit").Write 1
'Msgbox("After")

Select Case sSequence_wise_run_bit


Case 1
'Msgbox("sSequence_wise_run_bit")
	'HMIRuntime.Tags("Seq_1_status").Write 3
	HMIRuntime.Tags("PLC_Seq_1_Status").Write 3 ' PLC_Seq_1_Status
	'HMIRuntime.Tags("Sequence_wise_run_bit_1").Write 1
	
	
Case 2

	'HMIRuntime.Tags("Seq_2_status").Write 3
	HMIRuntime.Tags("PLC_Seq_2_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_2").Write 1
Case 3
	'HMIRuntime.Tags("Seq_3_status").Write 3
	HMIRuntime.Tags("PLC_Seq_3_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_3").Write 1
Case 4
	'HMIRuntime.Tags("Seq_4_status").Write 3
	HMIRuntime.Tags("PLC_Seq_4_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_4").Write 1
Case 5
	'HMIRuntime.Tags("Seq_5_status").Write 3
	HMIRuntime.Tags("PLC_Seq_5_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_5").Write 1
Case 6
	'HMIRuntime.Tags("Seq_6_status").Write 3
	HMIRuntime.Tags("PLC_Seq_6_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_6").Write 1
Case 7
	'HMIRuntime.Tags("Seq_7_status").Write 3
	HMIRuntime.Tags("PLC_Seq_7_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_7").Write 1
Case 8
	'HMIRuntime.Tags("Seq_8_status").Write 3
	HMIRuntime.Tags("PLC_Seq_8_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_8").Write 1
Case 9
	'HMIRuntime.Tags("Seq_9_status").Write 3
	HMIRuntime.Tags("PLC_Seq_9_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_9").Write 1
Case 10
	'HMIRuntime.Tags("Seq_10_status").Write 3
	HMIRuntime.Tags("PLC_Seq_10_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_10").Write 1
Case 11
	HMIRuntime.Tags("PLC_Seq_11_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_11").Write 1
Case 12
	HMIRuntime.Tags("PLC_Seq_12_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_12").Write 1
Case 13
	HMIRuntime.Tags("PLC_Seq_13_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_13").Write 1
Case 14
	HMIRuntime.Tags("PLC_Seq_14_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_14").Write 1
Case 15
	HMIRuntime.Tags("PLC_Seq_15_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_15").Write 1
Case 16
	HMIRuntime.Tags("PLC_Seq_16_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_16").Write 1
Case 17
	HMIRuntime.Tags("PLC_Seq_17_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_17").Write 1
Case 18
	HMIRuntime.Tags("PLC_Seq_18_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_18").Write 1
Case 19
	HMIRuntime.Tags("PLC_Seq_19_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_19").Write 1
Case 20
	HMIRuntime.Tags("PLC_Seq_20_Status").Write 3
	'HMIRuntime.Tags("Sequence_wise_run_bit_20").Write 1
	
End Select
'Call Recipe_Shedule()
HMIRuntime.Tags("Download_Progress_Bar").write 1000
HMIRuntime.Tags("Download_Progress_Popup").write 0
Msgbox("Recipe Downloaded ("& sSelectRecipe &") Successfully to PLC")

'Dim xd
'
'xd =HMIRuntime.Tags("Poly1SetWt").read
'HMIRuntime.Tags("Poly_Weighing_Current_Set_Wt").Write xd


'		dteWait1 = DateAdd("s",2, Now())
'		Do Until (Now() > dteWait1)
'		Loop
'Call Reload_Mixing_Sequence()
End S



