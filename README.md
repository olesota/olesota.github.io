# InfoVis Lab Project
Submission template for the InfoVis lab project at the Johannes Kepler University Linz.

**Explanation:**
This `README.md` needs to be pushed to Github for each of the 3 delivery dates.
For every submission change/extend the corresponding sections by replacing the [TODO] markers.
*In order to meet the deadlines make sure you push everything to your Github repository.*
For more details see [*Moodle page*](https://moodle.jku.at/jku/course/view.php?id=9291).

**Tip:** Make yourself familiar with [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

# Submission due on 22.04.2020

## General Information

**Project Name:** Waterloo

**Group Members**

| Student ID    | First Name  | Last Name      |
| --------------|-------------|----------------|
| k11747899        | Oleg      | Lesota         |
| k11737898        | Santa      | Pile       |

## Dataset

* What is the dataset about?
* Where did you get this dataset from (i.e., source of the dataset)?
* How was the dataset generated?
* What is dataset size in terms of nodes, items, rows, columns, ...?
* How is the dataset structured?

### Context
Battle of Waterloo (18 June 1815) is significant in many respects. It was the last grand battle of Emperor Napoleon, who just escaped from his exile on Elba (26 February 1815) in order to defeat coalition of United Kingdom, Prussia, Austria and Russia one by one, before they managed to consolidate their forces. At Waterloo Napoleon (left) faced British forces lead by Duke of Wellington (middle) who were desperately trying to unite with Prussian army under command of Generalfeldmarschal Blücher (right);

<img src="https://github.com/jku-icg-classroom/infovis-lab-project-2020-waterloo/blob/master/napoleon_1.png" alt="Napoleon" width="180"/><img src="https://github.com/jku-icg-classroom/infovis-lab-project-2020-waterloo/blob/master/wellington.png" alt="Wellington" width="180"/><img src="https://github.com/jku-icg-classroom/infovis-lab-project-2020-waterloo/blob/master/bluecher.png" alt="Blücher" width="180"/>

### Data Source
This is also one of the best documented battles in history due to countless journals, letters and other materials written by participants which only recently became publically available. Aggregated into numerous studies they became source for JunIBIS Waterloo Dataset we selected for our project. It is available on [datahub.io](https://datahub.io/andrejjh/junibis_data) and was gathered by two Belgian engineers André Heughebaert and with Eric Iven [(interview)](https://www.napoleon.org/en/magazine/interviews/andre-heughebaert-and-eric-iven-a-mad-project-to-create-a-website-dedicated-to-the-mapping-of-the-campaign-of-belgium-in-june-1815-juin-2015/);

This dataset was created as a part of commemoration project for 200th anniversary of the Battle of Waterloo (2015), but has been published only last year (2019); It was gathered manually through studyig multuple sources and assigning geo-position to each unit at **every hour** between 15 and 22 June 1815 (168 time points); Of course only data for position changes present in order to avoid unnecessary redundancy; Another contribution of the authors is a website visualizing this data: (http://www.junibis.be). However despite the big variety of visualizations it can be difficult to use or interpret.

### Contents and structure
This dataset consists of multiple files, some of the most interesting ones are:
* **positions.csv** - hourly geo-positions of each unit 28k records:
    * unitid - identification code of the unit, usually contains encryptes unit information (B01RFG2B - British 1rst Royal Foot Guards 2nd Battalion) 501 unique unit ids;

    * army - code of the side unit fought on (1 to 5);
    * step - time step, corresponds to one of 169 hours covered by the dataset;
    * datetime - formatted string timestamp: "YYYY-MM-DD HH:MM:SS";
    * geopos - string geoposition: "LONGITUDE, LATITUDE";
    
#### Positions.csv on the map
Below we plotted every record from positions.csv on the map. It allows us to some degree check confirm validity of the data. Indeed we can see blue points (Napoleon's army) coming from the south, red dots (British army) spreading from the west, covering retreat to Britain towards Bruxelles. We also see that most cluttered spots are Quatre Bras, Ligne, Warve, Waterloo, where the most of the action took place:

<img src="https://github.com/jku-icg-classroom/infovis-lab-project-2020-waterloo/blob/master/positions_overview.png" alt="Blücher" width="900"/>
    
* **units.csv** - detalization on what the units are

    * code - same as unitid from positions.csv;
    * parent - parent unit, e.g. a brigade the unit was part of, parent units can have their own records in positions.csv;
    * name - full name of the unit;
    * bataillons, squadrons, batteries, engineers, ... - details on unit composition;
    * officers - number of officers;
    * men - number of men;
    * nation - nation the unit belongs to;
    
There are other files which can come in handy:

* **people.csv** - gives information about people involved, mostly commanders and officers, but also men. Name, rank, nation;
* **uplinks.csv** - maps people to units, and their roles;
* **events.csv** - list of four main events of the campaign: Quatre Bras, Ligny, Wavre, Waterloo (MontStJean) battles. Start/end time;
* **uelinks.csv** - maps units to events;
* finally there are files containing references to books and index of terms in different languages;
## User Tasks & Goals
* What are the user tasks?
* What would users like to see/get from the dataset?

Main idea is to get an overview of Belgian campaign (which the Battle of Waterloo is the end point of), see complex very road-dependant logistics of the era, get sence of scale of the events;

<img src="https://github.com/jku-icg-classroom/infovis-lab-project-2020-waterloo/blob/master/test_small.gif" alt="animated map"/>

User needs to be able to see unit positions on the map at any covered point of time as well as identify allignment of each unit;
An ability to refer events to a timeline is necessary. Crucial event's need to be marked on the timeline;
User should be able to track activity of sides to different levels of granularity (side - army - ... - regiment), an representation of force organization is needed;

We plan to create a visualization consisting of two views:
* A timeline showing number of moving units for each hour, for each side. Four key battles are marked on the timeline. Timeline also works as a unit filter by battle event and by brigade (each side had a number of brigade) e.g. "show only movement of units belonging to 2nd Brigade of British forces", or "show only movement of units participated in Quatre Bras battle";
* A map, similar to animation above. The map will have buttons to move one step backward/forward in time (animated transitions), provide information about units on screen as a tooltip;

# Submission due on 13.05.2020

## Proposed Dashboard Solution

* Which type of visualizations did you use?
* Explain why you chose these visualizations?
* Add sketches or images if possible

### Visualization types
For our dashboard, as stated above, we selcted two visualizations:

* map - logical choice, bearing in mind that the most interesting bit of our data is geographical coordinates. We limimted the scope to the area where most of the action took place during Belgian campaign.
* stacked area plot doubling as a timeline - in order to demonstrate the unfolding narrative and allow for exploration through time we propose interactive timeline. User will be able to select any point in time and see according forces arrangement on the map. This plot will also display activity of each army through time as a stacked area plot (showing number of units changing their position at given point in time).

<img src=https://github.com/jku-icg-classroom/infovis-lab-project-2020-waterloo/blob/master/prototype.jpg width="400" alt="app prototype"/>

### Interactions

* Buttons forward/backward to move selector along the timeline one step left or right and adapt map visualization accordingly to display actual forces arrangement for the time step;
* Click on any point of the time line to see corresponding forces arrangement. Important! In order to provide logical and smooth transition the state of the map needs to change step by step, showing all the intermediate states between current and selected state. It will create sense of progression through time.
* Unit tracking. If at any time user selects a group of units on the map (with a selection frame) they will then be able to track position change of only those units through the whole time period (optionally those units + their parent super-units)

### Optional Addons

* Tooltip giving details about each unit on map: alignment, initial strength, unit name, origin;
* Story-telling functionality - popup information windows and markings drawing user's attention to certain events and explainig them. 6-8 info points on the timeline in total. Meaning that on certain timesteps additional information will be displayed;

### User Tasks Refined

* Overview of the campaign, education;
* Finding trends in unit movements;
* Tracking a group of units: from which part of the region did the units arrive to fight in a certain location;

# Submission due on 17.06.2020

## Implementation Details

* How did you implement the dashboard?
* Which external libraries and/or resources did you use?
* Additional information about the implementation

Our dashboard consists of two connected visualizations. Each of them is implemented as an SVG element, controlled by means of D3.js library. The user can interact with the dashboard using playback buttons and the visualizations themselves

Final version of the interface:

<img src=https://github.com/olesota/infovis-lab-project-2020-waterloo/blob/master/interface.png width="600" alt="app interface"/>

### Main Functions:
#### Timeline - Area Chart:
* The Area chart shows number of active detached units for each army every hour between 15 and 21 June 1815. The legend is split, showing that all the warm-coloured armies fought as allies against French army. This visualization gives an impression about how spread the forces were at given time step. We intentionally left the Y-axis without annotation because actual numbers are partially based on judjements of the authors of the data. Instead we suggest to use it as an illustration of how forces started being scattered all around and ended up in close formations at the end of the campaign;
* The X-axis shows time in days, each day is split into 24 hours. A vertical black line slides along the plot showing which point in time is displayed on the map plot below;
* The plot also allows to navigate through time. Clicking a point on the Timeline will result in the story quickly animated towards the point, visiting every point in between, preserving historical consistency this way; The further is the destinatinon point the faster is the playback;
* Any active playback can be stopped by clicking on the timeline;
#### Playback Buttons:
* Buttons Forwards and Backwards allow to move one step in time and see smooth change of units' positions on the map;
* Play button starts demo animation from the current step in time until the last. The animation speed is slower than when called through clicking on the Timeline. That's because Timeline is meant for quick navigation and Play button is for the Story overview;
* While the tool is in Play mode (no matter what caused it) the Play button turns into Stop button;
#### Map Visualization:
* The Map Visualization is a scatterplot laid over a historical map of the area. The coordinates are matched by key points of action and big cities. This plot shows unit positions in each step of time (specified by the Timeline-tracker). The units are colorcoded into one of six participant armies, same as on the Timeline;
* On hover over a dot tooltip apears featuring additional information about the unit: allighnment (French of Allied), unit name and unit id in dataset terms (derived from name);
* The map supports zooming and panning. Zooming is done with mouse wheel (sit may be necessary to activate the visualization by clicking/dragging it first). Panning is done by dragging the map around. As the background image is a high-resolution scan of a historical map (4.9 MB) the whole plot looks presentable even with 8x zoom;
#### Interface:
* The size of the elements is adjusted with the size of the window. The SVGs are rescaled staying consistent. Combined with the Zoom function on the map it allows to use the tool even on the smallest of screens;

### Recourses:
* JavaScript;
* D3.js;
* Decorative font Tangerine;
* "Part of Belgium" engraved by J. Kirkwood in approx 1844, scan by William Siborne (public domain);
* Jupyter Notebook for data wrangling;

### Additional:
* The initial dataset was transformed to a single .csv file for easier handling; 
* In order to plot the timeline, the data is additionally aggregated and stacked with D3.js;

## Limitations

* What are the limitations of your solution?
* Is there anything that a user could not achieve from the given user tasks? Why? What is missing and how must the prototype be improved?

* Due to the nature of the dataset (handcrafted using multiple historical references) a number of issues in it. For example a unit can be mentioned twice for a single timestep (which probably means lack of historical data about which part of the unit was where). Also units acting as a larger super-unit, e.g. brigade, are recorded as a single point (that brigade), but if at some point the super-unit separates back, the record about the brigade is replaced by a multitude of records (one for each sub-unit). Such record aggregation is not consistent and it can often be the case that a number of points are plotted on top of each other. Because of all this it can be tricky to track each separate unit. Anyway our initial idea was to show movemend trends ignoring precise unit positioning.
* Area plot showing dissipation of each force (basically record count per army per hour) would be a bit more useful if we managed to display another activity metrics there: marching distance (per soldier in army per hour), total army strength per hour (no data available). Although in a way subjective the dissipation metric gives a few interesting paterns to analyze. In future we might consider putting more work into the dataset and visualization to derive more metrics and get smoother movement picture;
* While suitable for research and demonstration purpouses the tool still requires some knowledge in order to interprete the visualizations. To be accessible for someone who wants to study Belgian campaign by themselves the tool needs to have text annotation and background story linked to timeline steps (in an Interactive Fiction fashion). Which we plan to add in a hope that this tool might become an instrument for self-education;

## Findings and Insights

* How does the solution enable users to answer the tasks?
* What are the findings and insights from the dataset?

* The user is able to navigate the story of Belgian campaign in time and space, zooming in and out on the map. It makes our tool perfect for illustration the narrative of the battles (while learning the matter personally or for in-class demonstration). Through these navigation possibilities user can examine unit movement in detail or on a general level. Ability to replay the same moment again and again allows for tracking and analyzing simultaneous movement.

* Using our visualization we got a number of insights:
   * The dataset captures units separating into sub-units and gathering into super-units;
   * There are ambiguities present in the data, especially regarding positions of individual low-level units (which is understandable as the data is gathered manually and when there was not enough historical references the authors probably had to make assumptions);
   * We learned more about military logistics of Napoleonic era. We saw that while there is a battle taking place, units have to march night and day and then go into fight right from the march in order to support their allies. On the other hand when there is no big threat units take time for rest. A good example is the time period between 19th June midday and 20th of June midday. It shows French units retreating constantly while Prussian forces only start chase in the morning of 20th.
   * Our visualisation gave us insight about how main events were synchronized. It is well-known that battle of Quatre Brass took place simoultaneously with battle of Ligny and that battle of Watrloo began at about the same time as battle at Warve. When dynamically plotted on a map those events get additional sense and narrative. Napoleon's plan to prevent the allies from uniting their forces becomes more evident. It is visible how he attacks both British and Prussian to pin them down and hold in place.


## Conclusion

* What is your conclusion?

* We developed a tool illustrating Belgian campain of Napoleon, a significant chain of events in world history. It allows to closer study and understand particular events and also warfare reality of the period in general.
While it is very useful for people with prior knowledge (for research and demonstartion) it can be lacking annotation for people learning from scratch. With that in mind we established two directions for future work:
   * Annotating the events, pointing out key locations, creating an Interactive Literature experience. Trying to involve dataset authors and other experts;
   * Working with the data processing in order to get more consistant picture and allow for more reliable unit tracking (including type, size, movement);
   
### Value
Our work has educational value as it enables additional means of learning the matter and introduces a more fluent interface.
Previously developed visualizations can be found on the web-site of the authors of the dataset: [http://www.junibis.be]
