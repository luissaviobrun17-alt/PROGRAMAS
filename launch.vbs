' FREE WORLD — English Mastery Course
' Anti Gravity System L99
' Launcher - Opens in Chrome App Mode (no address bar)

Dim shell, fso, appPath, chromePaths, chromePath, foundChrome

Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Get the folder where this script is located
appPath = fso.GetParentFolderName(WScript.ScriptFullName)

' Try to find Chrome
chromePaths = Array( _
    shell.ExpandEnvironmentStrings("%ProgramFiles%") & "\Google\Chrome\Application\chrome.exe", _
    shell.ExpandEnvironmentStrings("%ProgramFiles(x86)%") & "\Google\Chrome\Application\chrome.exe", _
    shell.ExpandEnvironmentStrings("%LocalAppData%") & "\Google\Chrome\Application\chrome.exe" _
)

foundChrome = ""
For Each cp In chromePaths
    If fso.FileExists(cp) Then
        foundChrome = cp
        Exit For
    End If
Next

If foundChrome <> "" Then
    ' Open in Chrome App Mode (like a standalone app, no address bar!)
    shell.Run """" & foundChrome & """ --app=""file:///" & Replace(appPath, "\", "/") & "/index.html"" --window-size=1400,900 --window-position=100,50", 1, False
Else
    ' Fallback: open in default browser
    shell.Run "file:///" & Replace(appPath, "\", "/") & "/index.html", 1, False
End If

Set shell = Nothing
Set fso = Nothing
