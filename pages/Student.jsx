import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/StudentDashboard.css';

const Student = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <header className="dash-header">
        <div className="school-info">
          <div className="school-logo">🍎</div>
          <div>
            <h1 className="school-name">Jasper Elite School</h1>
            <p className="school-desc">Student Performance Dashboard</p>
          </div>
        </div>
        <div className="header-icons">
          <span className="icon" title="Notifications">🔔</span>
          <span className="icon" title="Play">▶️</span>
          <span className="icon" title="Settings">⚙️</span>
          <span className="icon" title="Theme">🌙</span>
          <div style={{fontSize: '12px', color: '#b2a8d6', marginLeft: '16px'}}>
            Last updated <strong>3min ago</strong> 🔄
          </div>
          <div className="user-profile">
            <span className="user-name">Signed in as <strong>Principal Carter</strong></span>
            <div className="avatar">👩🏾</div>
            <button 
              onClick={handleLogout} 
              style={{background:'transparent', border:'none', color:'#b2a8d6', cursor:'pointer', marginLeft:'8px', fontSize:'16px'}}
              title="Logout"
            >
              🚪
            </button>
          </div>
        </div>
      </header>

      {/* DASH GRID */}
      <main className="dash-content">
        
        {/* LEFT COLUMN */}
        <div className="col-left">
          
          {/* Quick Stats Row 1 */}
          <div className="quick-stats-row">
            <div className="selector-box">
              <select><option>Select Year</option><option>2026</option></select>
            </div>
            <div className="card" style={{flex: 1.5, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px'}}>
              <div style={{fontSize: '32px'}}>👥</div>
              <div>
                <p className="stat-val">3,457</p>
                <p className="stat-label">Student Count</p>
              </div>
            </div>
            <div className="card" style={{flex: 1.5, padding: '16px', display: 'flex', alignItems: 'center', gap: '16px'}}>
              <div style={{fontSize: '32px'}}>✅</div>
              <div>
                <p className="stat-val">83.7%</p>
                <p className="stat-label">Student Attendance</p>
              </div>
            </div>
          </div>

          {/* Quick Stats Row 2 (Selectors) */}
          <div className="quick-stats-row" style={{marginTop: '-8px'}}>
            <div className="selector-box">
              <select><option>Select Grade</option><option>Grade 3</option></select>
            </div>
            <div className="trend-row" style={{flex: 3, display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
              <div>Student Count: <span className="trend-up">4.5% 📈</span></div>
              <div>Student Attendance: <span className="trend-down">1.2% 📉</span></div>
              <div>Exam Average: <span className="trend-up">77.7% 📈</span></div>
            </div>
          </div>

          {/* Student Count Chart */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Student Count</h3>
              <div style={{fontSize:'13px', color:'#5a67d8', display:'flex', gap:'12px', cursor:'pointer'}}>
                <span>Grade ↑↓</span>
                <span>Gender 👤</span>
                <span>🔄</span>
              </div>
            </div>
            <div className="donut-grid">
              <div className="donut-mock">
                <div className="donut-inner">
                  <span className="donut-val">28.9%</span>
                  <span className="donut-lbl">GRADE 3</span>
                </div>
              </div>
              <div className="chart-bars">
                {/* Custom bars */}
                <div className="bar-row">
                  <div className="bar-label"><div className="dot" style={{background:'#667eea'}}></div> Grade 1</div>
                  <div className="bar-track"><div className="bar-fill" style={{width:'40%', background:'#667eea'}}></div></div>
                  <span>457</span>
                </div>
                <div className="bar-row">
                  <div className="bar-label"><div className="dot" style={{background:'#00c6ff'}}></div> Grade 2</div>
                  <div className="bar-track"><div className="bar-fill" style={{width:'70%', background:'#00c6ff'}}></div></div>
                  <span>769</span>
                </div>
                <div className="bar-row">
                  <div className="bar-label"><div className="dot" style={{background:'#764ba2'}}></div> Grade 3</div>
                  <div className="bar-track"><div className="bar-fill" style={{width:'90%', background:'#764ba2'}}></div></div>
                  <span>1000</span>
                </div>
                <div className="bar-row">
                  <div className="bar-label"><div className="dot" style={{background:'#0072ff'}}></div> Grade 4</div>
                  <div className="bar-track"><div className="bar-fill" style={{width:'50%', background:'#0072ff'}}></div></div>
                  <span>553</span>
                </div>
                <div className="bar-row">
                  <div className="bar-label"><div className="dot" style={{background:'#f6d365'}}></div> Grade 5</div>
                  <div className="bar-track"><div className="bar-fill" style={{width:'60%', background:'#f6d365'}}></div></div>
                  <span>678</span>
                </div>
              </div>
            </div>
          </div>

          {/* Examination Results */}
          <div className="card">
            <div className="card-header" style={{marginBottom: '0'}}>
              <h3 className="card-title">Examination Results</h3>
              <div style={{fontSize:'13px', color:'#5a67d8', display:'flex', gap:'12px', cursor:'pointer'}}>
                 <span>Grade ↑↓</span>
                 <span>Gender 👤</span>
                 <span>🔄</span>
              </div>
            </div>
            <div className="exam-legend">
              <div className="legend-item"><div className="legend-color" style={{background:'#4c1d95'}}></div> Pass</div>
              <div className="legend-item"><div className="legend-color" style={{background:'#3b82f6'}}></div> Average</div>
              <div className="legend-item"><div className="legend-color" style={{background:'#f59e0b'}}></div> Fail</div>
            </div>
            
            <div className="bar-chart-vertical">
              <div className="y-axis">
                <span>2k</span>
                <span>1k</span>
                <span>500</span>
              </div>
              
              <div className="x-group">
                <div className="v-bar" style={{height: '140px', background:'#4c1d95'}}></div>
                <div className="v-bar" style={{height: '50px', background:'#3b82f6'}}></div>
                <div className="v-bar" style={{height: '20px', background:'#f59e0b'}}></div>
                <div className="x-label">Maths</div>
              </div>
              
              <div className="x-group">
                <div className="v-bar" style={{height: '60px', background:'#4c1d95'}}></div>
                <div className="v-bar" style={{height: '110px', background:'#3b82f6'}}></div>
                <div className="v-bar" style={{height: '10px', background:'#f59e0b'}}></div>
                <div className="x-label">English</div>
                <div style={{position:'absolute', top:'-25px', left:'50%', transform:'translateX(-50%)', background:'#3b82f6', color:'white', fontSize:'10px', padding:'2px 6px', borderRadius:'10px'}}>59.9%</div>
              </div>

              <div className="x-group">
                <div className="v-bar" style={{height: '80px', background:'#4c1d95'}}></div>
                <div className="v-bar" style={{height: '40px', background:'#3b82f6'}}></div>
                <div className="v-bar" style={{height: '80px', background:'#f59e0b'}}></div>
                <div className="x-label">Mandarin</div>
              </div>

              <div className="x-group">
                <div className="v-bar" style={{height: '70px', background:'#4c1d95'}}></div>
                <div className="v-bar" style={{height: '100px', background:'#3b82f6'}}></div>
                <div className="v-bar" style={{height: '30px', background:'#f59e0b'}}></div>
                <div className="x-label">Science</div>
              </div>
              
              <div className="x-group">
                <div className="v-bar" style={{height: '150px', background:'#4c1d95'}}></div>
                <div className="v-bar" style={{height: '50px', background:'#3b82f6'}}></div>
                <div className="v-bar" style={{height: '10px', background:'#f59e0b'}}></div>
                <div className="x-label">Arts</div>
              </div>
              
              <div className="x-group">
                <div className="v-bar" style={{height: '90px', background:'#4c1d95'}}></div>
                <div className="v-bar" style={{height: '40px', background:'#3b82f6'}}></div>
                <div className="v-bar" style={{height: '0px', background:'#f59e0b'}}></div>
                <div className="x-label">Exercise</div>
              </div>
              
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="col-right">
          
          {/* Top rankings */}
          <div className="card">
            <div className="grid-2x2">
              <div>
                 <h4 style={{fontSize:'13px', color:'#718096', margin:'0 0 8px'}}>Best In Marks</h4>
                 <div className="rank-card">
                   <div className="rank-avatar" style={{background:'#c6f6d5', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px'}}>👦🏽</div>
                   <div className="rank-info">
                     <h4>Kinara Zuri</h4>
                     <div className="rank-stats">
                       <div><span>3</span> Grade</div>
                       <div><span>5</span> GPA</div>
                       <div><span>77.3%</span> Attend</div>
                     </div>
                   </div>
                 </div>
              </div>

              <div>
                 <h4 style={{fontSize:'13px', color:'#718096', margin:'0 0 8px'}}>Best In Attendance</h4>
                 <div className="rank-card">
                   <div className="rank-avatar" style={{background:'#feebc8', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px'}}>👧🏻</div>
                   <div className="rank-info">
                     <h4>Lea Jabulani</h4>
                     <div className="rank-stats">
                       <div><span>4</span> Grade</div>
                       <div><span>4</span> GPA</div>
                       <div><span>75.3%</span> Marks</div>
                     </div>
                   </div>
                 </div>
              </div>

              <div>
                 <h4 style={{fontSize:'13px', color:'#718096', margin:'0 0 8px', marginTop:'16px'}}>Most Improved In Marks</h4>
                 <div className="rank-card">
                   <div className="rank-avatar" style={{background:'#fed7e2', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px'}}>👧🏽</div>
                   <div className="rank-info">
                     <h4>Corny Niang</h4>
                     <div className="rank-stats">
                       <div><span>5</span> Grade</div>
                       <div><span>3</span> GPA</div>
                       <div><span>80.2%</span> Attend</div>
                     </div>
                   </div>
                 </div>
              </div>

              <div>
                 <h4 style={{fontSize:'13px', color:'#718096', margin:'0 0 8px', marginTop:'16px'}}>Most Improved In Attendance</h4>
                 <div className="rank-card">
                   <div className="rank-avatar" style={{background:'#e2e8f0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px'}}>👦🏻</div>
                   <div className="rank-info">
                     <h4>Yao Ming</h4>
                     <div className="rank-stats">
                       <div><span>1</span> Grade</div>
                       <div><span>5</span> GPA</div>
                       <div><span>86.8%</span> Marks</div>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Student Details */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Student Details</h3>
              <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                <select style={{padding:'4px 8px', borderRadius:'6px', border:'1px solid #e2e8f0', color:'#5a67d8', outline:'none', fontWeight:'600'}}>
                  <option>Grade 1</option>
                  <option>Grade 2</option>
                  <option>Grade 3</option>
                </select>
                <span style={{color:'#a0aec0', cursor:'pointer'}}>🔲 🔄</span>
              </div>
            </div>
            
            <div className="student-cards">
              <div className="s-card">
                <div className="s-avatar" style={{background:'#fed7e2', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px'}}>👦🏽</div>
                <div className="s-gender">Male</div>
                <h4 className="s-name">Luka Magic</h4>
                <div className="s-stats">
                  <div><strong>73.7%</strong><br/>Marks</div>
                  <div><strong>5</strong><br/>GPA</div>
                  <div><strong>77.3%</strong><br/>Attend</div>
                </div>
              </div>
              
              <div className="s-card">
                <div className="s-avatar" style={{background:'#e9d8fd', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px'}}>👧🏻</div>
                <div className="s-gender">Female</div>
                <h4 className="s-name">Bianca Shangwe</h4>
                <div className="s-stats">
                  <div><strong>63.7%</strong><br/>Marks</div>
                  <div><strong>2</strong><br/>GPA</div>
                  <div><strong>67.7%</strong><br/>Attend</div>
                </div>
              </div>
              
              <div className="s-card">
                <div className="s-avatar" style={{background:'#c6f6d5', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px'}}>👦🏻</div>
                <div className="s-gender">Male</div>
                <h4 className="s-name">Alpha Kenya</h4>
                <div className="s-stats">
                  <div><strong>83.1%</strong><br/>Marks</div>
                  <div><strong>5</strong><br/>GPA</div>
                  <div><strong>79.9%</strong><br/>Attend</div>
                </div>
              </div>
            </div>
          </div>

          {/* Average Score */}
          <div className="card">
             <div className="card-header">
               <h3 className="card-title">Average Score</h3>
               <span style={{color:'#a0aec0', cursor:'pointer'}}>⇅ 🔄</span>
             </div>
             <div className="radiuses">
               
               <div className="radial-wrap">
                 <div className="radial-chart" style={{background: 'conic-gradient(#5a67d8 94.5%, #edf2f7 0)'}}>
                   <div className="r-inner">94.5%</div>
                 </div>
                 <span className="r-label">English</span>
               </div>
               
               <div className="radial-wrap">
                 <div className="radial-chart" style={{background: 'conic-gradient(#6b46c1 81.9%, #edf2f7 0)'}}>
                   <div className="r-inner">81.9%</div>
                 </div>
                 <span className="r-label">Maths</span>
               </div>
               
               <div className="radial-wrap">
                 <div className="radial-chart" style={{background: 'conic-gradient(#0bc5ea 69.4%, #edf2f7 0)'}}>
                   <div className="r-inner">69.4%</div>
                 </div>
                 <span className="r-label">Science</span>
               </div>

             </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Student;