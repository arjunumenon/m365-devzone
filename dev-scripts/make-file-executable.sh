#Go inside the folder and execute the following command:
find . -iname "*.sh" -exec bash -c 'chmod +x "$0"' {} \;