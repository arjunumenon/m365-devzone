# Deletion for Azure Functions
cd api
Remove-Item -Recurse -Force .\.deployment\
Remove-Item -Recurse -Force .\bin\
Remove-Item -Recurse -Force .\dist\
Remove-Item -Recurse -Force .\node_modules\
Remove-Item -Recurse -Force .\obj\
cd ..

# Deletion for Bot
cd bot
Remove-Item -Recurse -Force .\.deployment\
Remove-Item -Recurse -Force .\lib\
Remove-Item -Recurse -Force .\node_modules\
cd ..

# Deletion for tabs
cd tabs
Remove-Item -Recurse -Force .\build\
Remove-Item -Recurse -Force .\node_modules\
cd ..

# Deletion for App Packages
Remove-Item -Recurse -Force .\build\