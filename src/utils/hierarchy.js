/**
 * Organization Hierarchy Utilities
 * 
 * Functions for converting the flat employee list into an organizational reporting tree
 * and looking up manager/direct report relationships.
 */

/**
 * Builds a hierarchical tree from a flat list of employees based on managerId.
 * Supports single or multiple root employees (where managerId is null or not found).
 * 
 * @param {Array} employees - List of all employee objects.
 * @returns {Array} List of root node objects: [{ employee, children: [...] }]
 */
export function buildHierarchy(employees) {
  if (!Array.isArray(employees) || employees.length === 0) {
    return [];
  }

  // Create a fast lookup map for all employee IDs
  const employeeMap = new Map();
  const childrenMap = new Map();

  employees.forEach((emp) => {
    employeeMap.set(emp.id, emp);
    childrenMap.set(emp.id, []);
  });

  const roots = [];

  // Group employees under their managers
  employees.forEach((emp) => {
    if (emp.managerId && employeeMap.has(emp.managerId)) {
      childrenMap.get(emp.managerId).push(emp);
    } else {
      // If managerId is null or manager doesn't exist in dataset, treat as root
      roots.push(emp);
    }
  });

  // Recursive tree constructor
  function constructNode(employee) {
    const directReports = childrenMap.get(employee.id) || [];
    return {
      employee,
      children: directReports.map((child) => constructNode(child)),
    };
  }

  return roots.map((rootEmp) => constructNode(rootEmp));
}

/**
 * Finds the direct reporting manager of a specific employee.
 * 
 * @param {string} employeeId - ID of the target employee.
 * @param {Array} employees - List of all employees.
 * @returns {Object|null} The manager employee object or null if root/not found.
 */
export function getManager(employeeId, employees) {
  const emp = employees.find((e) => e.id === employeeId);
  if (!emp || !emp.managerId) return null;
  return employees.find((e) => e.id === emp.managerId) || null;
}

/**
 * Finds all direct reports for a given manager.
 * 
 * @param {string} managerId - ID of the manager.
 * @param {Array} employees - List of all employees.
 * @returns {Array} List of direct report employee objects.
 */
export function getDirectReports(managerId, employees) {
  if (!managerId || !Array.isArray(employees)) return [];
  return employees.filter((e) => e.managerId === managerId);
}

/**
 * Computes the reporting path from the top-level root employee down to the specified employee.
 * 
 * @param {string} employeeId - ID of the target employee.
 * @param {Array} employees - List of all employees.
 * @returns {Array} List of employee objects from root to target employee.
 */
export function getOrganizationPath(employeeId, employees) {
  if (!employeeId || !Array.isArray(employees)) return [];

  const path = [];
  const visited = new Set();
  let current = employees.find((e) => e.id === employeeId);

  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    path.push(current);
    if (!current.managerId) break;
    current = employees.find((e) => e.id === current.managerId);
  }

  return path.reverse();
}
