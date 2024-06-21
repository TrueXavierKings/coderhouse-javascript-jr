## Bands JSON Structure

The `bands.json` file, located in the `data\json` directory, contains information about various K-Pop bands. Each band is represented as a JSON object with the following fields:

- **bandName**: The name of the band.
- **agency**: The agency managing the band.
- **membersAmount**: The number of members in the band.
- **yearsActive**: The range of years the band has been active.
- **numberOfAlbums**: The number of albums released by the band.
- **key**: A unique identifier for the band, used for creating directories and other purposes.

### Example JSON Structure

```json
[
  {
    "bandName": "Kep1er",
    "agency": "WAKEONE",
    "membersAmount": 9,
    "yearsActive": "2021-present",
    "numberOfAlbums": 1,
    "key": "kep1er0000"
  },
  {
    "bandName": "ITZY",
    "agency": "JYP Entertainment",
    "membersAmount": 5,
    "yearsActive": "2019-present",
    "numberOfAlbums": 2,
    "key": "itzy000000"
  },
  {
    "bandName": "AESPA",
    "agency": "SM Entertainment",
    "membersAmount": 4,
    "yearsActive": "2020-present",
    "numberOfAlbums": 1,
    "key": "aespa00000"
  },
  {
    "bandName": "Black Pink",
    "agency": "YG Entertainment",
    "membersAmount": 4,
    "yearsActive": "2016-present",
    "numberOfAlbums": 3,
    "key": "blackpink"
  }
]
```

The bands.json file is essential for managing and organizing data related to K-Pop bands in this project.

## Members JSON Structure

The `members.json` file, located in the `data\json` directory, contains information about individual members of various K-Pop bands. Each member is represented as a JSON object with the following fields:

- **name**: The name of the member.
- **birthday**: The birthdate of the member.
- **weight**: The weight of the member.
- **height**: The height of the member.
- **nationality**: The nationality of the member.
- **agency**: The agency managing the member.
- **bandName**: The name of the band to which the member belongs.
- **bandKey**: A unique identifier for the band, used to associate the member with their band.

### Example JSON Structure

```json
[
    {
        "name":  "Choi Yu-jin",
        "birthday":  "1996-08-12",
        "weight":  "42 kg",
        "height":  "162 cm",
        "nationality":  "Korean",
        "agency":  "WAKEONE",
        "bandName":  "Kep1er",
        "bandKey":  "kep1er0000"
    },
    {
        "name":  "Sakamoto Mashiro",
        "birthday":  "1999-12-16",
        "weight":  "45 kg",
        "height":  "157 cm",
        "nationality":  "Japanese",
        "agency":  "WAKEONE",
        "bandName":  "Kep1er",
        "bandKey":  "kep1er0000"
    },
    {
        "name":  "Shen Xiaoting",
        "birthday":  "1999-11-12",
        "weight":  "50 kg",
        "height":  "168 cm",
        "nationality":  "Chinese",
        "agency":  "WAKEONE",
        "bandName":  "Kep1er",
        "bandKey":  "kep1er0000"
    },
    {
        "name":  "Kim Chaehyun",
        "birthday":  "2002-04-26",
        "weight":  "47 kg",
        "height":  "160 cm",
        "nationality":  "Korean",
        "agency":  "WAKEONE",
        "bandName":  "Kep1er",
        "bandKey":  "kep1er0000"
    }
]
```

The members.json file is essential for managing and organizing data related to individual members of K-Pop bands in this project.

## Band Directory Creator Script

The `addBands.ps1` script is a PowerShell script designed to create a directory structure based on the `bands.json` file. Each directory is named using the `key` field from the `bands.json` file.

### Script Description

This script performs the following steps:
1. Gets the current script directory.
2. Defines the path to the JSON file (relative to the script location).
3. Defines the base directory where the folders will be created (relative to the script location).
4. Loads the JSON data.
5. Creates directories based on the `key` field from the JSON data, with console logging for created and existing directories.

### How to Execute the Script

1. **Open PowerShell**:
   - Open PowerShell on your system.

2. **Navigate to the Script Directory**:
   - Change the directory to where the `addBands.ps1` script is located.
     ```powershell
     cd path\to\data\batch
     ```

3. **Run the Script**:
   - Execute the script using the following command:
     ```powershell
     .\addBands.ps1
     ```

Upon execution, the script will:
- Load the `bands.json` file.
- Create directories in the specified base directory using the `key` field from the `bands.json` file.
- Log messages indicating whether directories were created or already existed.

## Member id add Script

The `addMembers.ps1` script is a PowerShell script designed to add and id to each member based on the `members.json` file.

### Script Description

This script performs the following steps:
1. Gets the current script directory.
2. Defines the path to the JSON file (relative to the script location).
3. For each members it will validate if the `id` field exists, if not, it will generate it and generate a value for it based on other fields of the same element.

### How to Execute the Script

1. **Open PowerShell**:
   - Open PowerShell on your system.

2. **Navigate to the Script Directory**:
   - Change the directory to where the `addBands.ps1` script is located.
     ```powershell
     cd path\to\data\batch
     ```

3. **Run the Script**:
   - Execute the script using the following command:
     ```powershell
     .\addMembers.ps1
     ```

Upon execution, the script will:
- Load the `members.json` file.
- Add or validate the `id` field for each member.
- Create a backup of the original `members.json` file with a timestamp.
- Save the updated `members.json` file with the `id` field included.

## Member-Band Key Matcher Script

The `memberBandMatcher.ps1` script is a PowerShell script designed to update the `members.json` file by adding or validating the `bandKey` field for each member. The `bandKey` is derived from the corresponding entry in the `bands.json` file based on the `bandName` field.

### How to Execute the Script

1. **Open PowerShell**:
   - Open PowerShell on your system.

2. **Navigate to the Script Directory**:
   - Change the directory to where the `memberBandMatcher.ps1` script is located.
     ```powershell
     cd path\to\data\batch
     ```

3. **Run the Script**:
   - Execute the script using the following command:
     ```powershell
     .\memberBandMatcher.ps1
     ```

Upon execution, the script will:
- Load the `bands.json` and `members.json` files.
- Add or validate the `bandKey` field for each member.
- Create a backup of the original `members.json` file with a timestamp.
- Save the updated `members.json` file with the `bandKey` field included.


This README file should provide clear instructions for anyone looking to understand the project, add new bands, and run the script.

