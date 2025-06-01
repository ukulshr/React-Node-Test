# React & Node.js Skill Test

## Estimated Time

- 60 min

## Requirements

- Bug fix to login without any issues (20min) <br/>
  There is no need to change or add login function.
  Interpret the code structure and set the correct environment by the experience of building projects. <br/>
  Here is a login information. <br/>
  ✓ email: admin@gmail.com  ✓ password: admin123

- Implement Restful API of "Meeting" in the both of server and client sides (40min)<br/>
  Focus Code Style and Code Optimization. <br/>
  Reference other functions.

## Meeting API Implementation

### Server-Side API Endpoints

**Base URL**: `/api/meeting`

#### 1. Get All Meetings
- **Endpoint**: `GET /api/meeting`
- **Authentication**: Required
- **Description**: Retrieve all meetings for authenticated user
- **Query Parameters**: 
  - For superAdmin: Returns all meetings
  - For regular users: Filtered by `createBy` user ID
- **Response**: Array of meeting objects with populated user information

#### 2. Create New Meeting
- **Endpoint**: `POST /api/meeting/add`
- **Authentication**: Required
- **Description**: Create a new meeting
- **Request Body**:
  ```json
  {
    "agenda": "string (required)",
    "attendes": ["contactId1", "contactId2"],
    "attendesLead": ["leadId1", "leadId2"],
    "location": "string",
    "dateTime": "ISO date string (required)",
    "endDateTime": "ISO date string",
    "notes": "string",
    "meetingType": "in-person|virtual|phone|hybrid",
    "priority": "low|medium|high|urgent",
    "status": "scheduled|in-progress|completed|cancelled",
    "meetingUrl": "string",
    "followUpRequired": "boolean",
    "followUpDate": "ISO date string"
  }
  ```

#### 3. Get Single Meeting
- **Endpoint**: `GET /api/meeting/view/:id`
- **Authentication**: Required
- **Description**: Retrieve a specific meeting by ID
- **Parameters**: `id` - Meeting ID
- **Response**: Meeting object with populated attendees and creator information

#### 4. Update Meeting
- **Endpoint**: `PUT /api/meeting/edit/:id`
- **Authentication**: Required
- **Description**: Update an existing meeting
- **Parameters**: `id` - Meeting ID
- **Request Body**: Same as create meeting (partial updates allowed)

#### 5. Delete Single Meeting
- **Endpoint**: `DELETE /api/meeting/delete/:id`
- **Authentication**: Required
- **Description**: Soft delete a meeting (sets deleted flag)
- **Parameters**: `id` - Meeting ID

#### 6. Delete Multiple Meetings
- **Endpoint**: `POST /api/meeting/deleteMany`
- **Authentication**: Required
- **Description**: Soft delete multiple meetings
- **Request Body**:
  ```json
  {
    "ids": ["meetingId1", "meetingId2", "meetingId3"]
  }
  ```

### Meeting Schema Fields

- **agenda**: Meeting agenda (required)
- **attendes**: Array of Contact IDs
- **attendesLead**: Array of Lead IDs  
- **location**: Meeting location
- **meetingType**: Type of meeting (in-person, virtual, phone, hybrid)
- **status**: Meeting status (scheduled, in-progress, completed, cancelled)
- **priority**: Priority level (low, medium, high, urgent)
- **dateTime**: Meeting start date and time (required)
- **endDateTime**: Meeting end date and time
- **notes**: Additional notes
- **outcome**: Meeting outcome/results
- **followUpRequired**: Boolean flag for follow-up requirement
- **followUpDate**: Follow-up date if required
- **meetingUrl**: Virtual meeting URL
- **attachments**: Array of file attachments
- **createBy**: User who created the meeting
- **createdDate**: Creation timestamp
- **updatedDate**: Last update timestamp
- **deleted**: Soft delete flag

## Client-Side UI Implementation

### Meeting Management Interface

#### 1. Main Meeting List (`/metting`)
- **Features**:
  - Responsive data table with meeting records
  - Sortable columns (Agenda, Date & Time, Created By)
  - Bulk selection and deletion
  - Advanced search functionality
  - Real-time data updates
  - Pagination support
  - Access control based on user permissions

#### 2. Add Meeting Modal
- **Features**:
  - Form validation using Yup schema
  - Contact and Lead selection with autocomplete
  - Date/time picker with validation
  - Real-time form validation
  - Success/error notifications
  - Responsive design

#### 3. Meeting Detail View (`/metting/:id`)
- **Features**:
  - Comprehensive meeting information display
  - PDF export functionality
  - Edit and delete actions
  - Related contacts/leads navigation
  - Responsive grid layout
  - Meeting status and priority indicators

#### 4. Meeting Quick View Modal
- **Features**:
  - Quick preview of meeting details
  - Action buttons (View, Edit, Delete)
  - Related entity links
  - Compact information display

#### 5. Advanced Search
- **Features**:
  - Multi-field search (agenda, creator, date range)
  - Date range filtering
  - Real-time search results
  - Search history management
  - Export search results

### Redux State Management
- **Slice**: `meetingSlice.js`
- **Actions**: `fetchMeetingData` async thunk
- **State**: Loading states, error handling, data caching

### Navigation Integration
- **Menu Item**: "Meetings" in sidebar navigation
- **Icon**: Google Meet icon
- **Access Control**: Role-based access (superAdmin, user)
- **Breadcrumb**: Proper navigation hierarchy

### Form Validation
- **Schema**: `meetingSchema.js` using Yup
- **Required Fields**: Agenda, Date & Time
- **Validation Rules**: 
  - Agenda required
  - Date/time required and future date validation
  - Array validation for attendees

### API Integration
- **Service**: Generic API service with authentication
- **Error Handling**: Comprehensive error management
- **Success Notifications**: Toast notifications for user feedback
- **Loading States**: Spinner components during API calls

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Grid System**: Chakra UI responsive grid
- **Touch-Friendly**: Mobile-optimized interactions
- **Accessibility**: ARIA labels and keyboard navigation

## Technical Implementation

### Backend Architecture
- **Framework**: Express.js with MongoDB
- **Authentication**: JWT-based middleware
- **Validation**: Mongoose schema validation
- **Error Handling**: Structured error responses
- **Database**: MongoDB with Mongoose ODM
- **Security**: CORS enabled, authenticated routes

### Frontend Architecture
- **Framework**: React with Chakra UI
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Form Management**: Formik with Yup validation
- **HTTP Client**: Axios with interceptors
- **Notifications**: React Toastify
- **Icons**: React Icons library

### Code Quality Features
- **Error Boundaries**: Component error handling
- **Loading States**: User feedback during async operations
- **Optimistic Updates**: Immediate UI feedback
- **Data Consistency**: Proper state synchronization
- **Memory Management**: Cleanup of event listeners and subscriptions